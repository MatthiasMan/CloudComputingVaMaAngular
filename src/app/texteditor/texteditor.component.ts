import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DocSelectionChangedService } from '../doc-selection-changed.service';
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import * as Y from 'yjs'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import { BackEndServiceService } from '../back-end-service.service';
import { Post } from '../Post';
import { WebsocketProvider } from 'y-websocket'

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css'],
  template: `
  <div #editorDaddy id="editorDaddy"></div>
    `,
})
export class TexteditorComponent implements OnInit {
  currentPost!: Post;
  messageReceived: any;
  lastconnectionstring: any;
  connectionString: string;
  private subscriptionName: Subscription;
  private quill: any;
  ydoc: any;
  provider: any;
  ytext: any;
  mydiv: any;
  text: any;
  constructor(@Inject(DOCUMENT) document: Document, private Service: DocSelectionChangedService, private backendService: BackEndServiceService) {
    this.connectionString = '';
    this.subscriptionName = this.Service.getUpdate().subscribe
      (message => { //message contains the data sent from service
        this.connectionString = message.text;
        this.getNote(message.text);
      });
  }

  ngOnInit(): void {
    Quill.register('modules/cursors', QuillCursors)
  }

  getNote(id: number) {
    this.backendService.getNote(id).subscribe(data => {
      this.currentPost = data;
      this.connectionString = data.name;
      var text;
      try {
        text = JSON.parse(data.content);
      } catch {
        text = "";
      }
      this.startConversation(text)
    });
  }

  saveDocument() {
    this.currentPost.content = JSON.stringify(this.quill.getContents());
    console.log("saving:" + this.currentPost.content);
    this.backendService.saveNote(this.currentPost).subscribe(error => console.log(error))
  }

  startConversation(content: string) {
    if (this.provider != null) {
      this.provider.destroy();
    }
    var e = <HTMLDivElement>document.querySelector('#editorDadd');
    e.innerHTML = "";
    e.innerHTML += '<div id="editor"></div>';

    this.quill = new Quill(<HTMLInputElement>document.querySelector('#editor'), {
      modules: {
        cursors: true,
        toolbar: [
          // adding some basic Quill content features
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ],
        history: {
          // Local undo shouldn't undo changes
          // from remote users
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // 'bubble' is also great
    })

    // A Yjs document holds the shared data
    this.ydoc = new Y.Doc()

    //this.provider = new WebrtcProvider('quill-demo-room', this.ydoc)
    this. provider = new WebsocketProvider(
      'wss://demos.yjs.dev', this.connectionString, this.ydoc
    )
    console.log(this.connectionString + "connn" )
    // Define a shared text type on the document
    this.ytext = this.ydoc.getText('quill')

    // "Bind" the quill editor to a Yjs text type.
    const binding = new QuillBinding(this.ytext, this.quill, this.provider.awareness)
    console.log(content);
    //setting the text in te editor
    //this.quill.setContents(content);

    // Remove the selection when the iframe is blurred
    window.addEventListener('blur', () => { this.quill.blur() })
  }
}




