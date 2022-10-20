import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { DocSelectionChangedService } from '../doc-selection-changed.service';
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import { Subscription } from 'rxjs';
import * as Y from 'yjs'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'


@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {
  messageReceived: any;
  private subscriptionName: Subscription;
  
  constructor(private Service:DocSelectionChangedService) {

    this.subscriptionName= this.Service.getUpdate().subscribe
             (message => { //message contains the data sent from service
             this.messageReceived = message;
             console.log('message received');
             });
  }
  
  ngOnInit(): void {   
    Quill.register('modules/cursors', QuillCursors)
    const quill = new Quill(<HTMLInputElement>document.querySelector('#editor'), {
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
    const ydoc = new Y.Doc()
    
    const provider = new WebrtcProvider('peterMatthias', ydoc)
    
    // Define a shared text type on the document
    const ytext = ydoc.getText('quill')
    
    // "Bind" the quill editor to a Yjs text type.
    const binding = new QuillBinding(ytext, quill, provider.awareness)
    
    // Remove the selection when the iframe is blurred
    window.addEventListener('blur', () => { quill.blur() })
    
  }
}




