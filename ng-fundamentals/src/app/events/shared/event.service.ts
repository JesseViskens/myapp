import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent, ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable() //enkel nodig wanneer je een extra service injecteert in een ander service. voeg het best altijd toe.
export class EventService {
    constructor (private http: HttpClient){}


    //we krijgen hier een observable (subject = observable) buiten van het type IEventArray
    getEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>('/api/events').pipe(catchError(this.errorhandler<IEvent[]>('getEvents',[])))
    }

    getEvent(id: number):Observable<IEvent> {
        console.log('/api/events/' +id)
        return this.http.get<IEvent>('/api/events/'+ id).pipe(catchError(this.errorhandler<IEvent>('getEvent')))
    }
    saveEvent(event) {
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post<IEvent>('/api/events',event, options)
        .pipe(catchError(this.errorhandler<IEvent>('SaveEvent')))
    }
    
    searchSessions(searchTerm: String): Observable<ISession[]> {
        return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
            .pipe(catchError(this.errorhandler<ISession[]>('searchEvent')))
    }

    private errorhandler<T>(operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}
