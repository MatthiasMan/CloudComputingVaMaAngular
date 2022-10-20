import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocSelectionChangedService } from '../doc-selection-changed.service';


@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css'],
})
export class DocListComponent implements OnInit {
  posts: any;
  constructor(private http: HttpClient, private Service: DocSelectionChangedService) { }

  ngOnInit(): void {

  }

  getDocs(): void {
    this.posts = ['doc_1', 'doc_2'];
    //this.posts = this.http.get<any>('https://jsonplaceholder.typicode.com/posts',);
  }

  tt(name: string) {
    console.log('clicked: ' + name)
    this.sendMessage();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.Service.sendUpdate('Message from Sender Component to Receiver Component!');
  }
}
