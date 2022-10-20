import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocSelectionChangedService {
  private subjectName = new Subject<any>();
  constructor() { }

  public sendUpdate(message: string) { //the component that wants to update something, calls this fn
    this.subjectName.next({ text: message }); //next() will feed the value in Subject
  }

  public getUpdate(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}
