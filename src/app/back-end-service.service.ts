import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {
  private domain: string;
  constructor(private http: HttpClient,) {
    this.domain = 'https://teameditwebapivama.azurewebsites.net';
  }

  public getNotes(): Observable<Post[]> {
    return this.http.get<Post[]>(this.domain + '/api')
  }

  public getNote(id: number): Observable<Post> {
    console.log(id);
    return this.http.get<Post>(this.domain + "/api/" + id);
  }

  public postNote(postName: String): Observable<any> {
    return this.http.post<Post>(this.domain + "/api/" + postName, {});
  }

  public saveNote(p: Post): Observable<any> {
    p.timeStamp = (moment(new Date())).format("MM/DD/YYYY hh:mm:ss");
    console.log(p);
    var s = this.domain + "/api/" + p.id + "?" + "content=" + p.content + "&timeStamp=" + p.timeStamp;
    console.log(s);
    return this.http.put<Post>(s,{});
  }

  public deleteNote(id:number) : Observable<any>{
   return  this.http.delete(this.domain + "/api/" + id)
  }
}
