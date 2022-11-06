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

  public postNote(postName: String): Observable<any> {
    return this.http.post<Post>(this.domain + "/api/" + postName, {});
  }

  public deleteNote(id:number) : Observable<any>{
   return  this.http.delete(this.domain + "/api/" + id)
  }
}
