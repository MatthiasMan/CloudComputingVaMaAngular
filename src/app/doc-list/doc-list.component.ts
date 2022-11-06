import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocSelectionChangedService } from '../doc-selection-changed.service';
import { BackEndServiceService } from '../back-end-service.service';
import { Post } from '../Post';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css'],
})
export class DocListComponent implements OnInit {
  public posts!: Post[];
  public loading: boolean = true;
  @Input() newDocName: string = "";
  constructor(private http: HttpClient, private Service: DocSelectionChangedService, private bckService: BackEndServiceService) { }

  ngOnInit(): void {
    this.getDocs();
  }

  getDocs(): void {
    this.bckService.getNotes().subscribe((data: Post[]) => {
      this.posts = data;
      this.loading = false;
    });
    //this.posts = ['quill-demo-room', 'PeterMandl','hh'];
    //this.posts = this.http.get<any>('https://jsonplaceholder.typicode.com/posts',);
  }

  tt(id: number) {
    console.log('clicked: ' + name)
    this.sendMessage(id);
  }

  sendMessage(id: number): void {
    // send message to subscribers via observable subject
    this.Service.sendUpdate(id);
  }

  removeDocument(id: number) {
    this.bckService.deleteNote(id).subscribe(data => {

      this.getDocs();
    });

  }

  addDocument() {
    this.bckService.postNote(this.newDocName).subscribe(data => {
      this.loading = true;
      this.bckService.getNotes().subscribe(d => {
        this.posts = d;
        this.loading = false;
        this.newDocName = "";
      });

    });
  }
}
