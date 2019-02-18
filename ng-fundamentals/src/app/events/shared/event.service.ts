import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { IEvent, ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


let options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable() //enkel nodig wanneer je een extra service injecteert in een ander service. voeg het best altijd toe.
export class EventService {

    constructor(private http: HttpClient) { }
    //we krijgen hier een observable (subject = observable) buiten van het type IEventArray
    getEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>('api/events').pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
    }
    getEvent(id: number): Observable<IEvent> {
        return this.http.get<IEvent>('api/events/' + id).pipe(catchError(this.handleError<IEvent>('getEvent')));

    }
    saveEvent(event) {
        //headers is een restricted name.

        //de IEvent hoort erbij omdat we een response van de db kunnen verwachten met bvb de id van dit object
        return this.http.post<IEvent>('/api/events/', event, options).pipe(catchError(this.handleError<IEvent>('postEvent')));

    }
    updateEvent(event) {
        /*
            let index = EVENTS.findIndex(x => x.id = event.id) //we zoeken de index van waar de id overeenkomt
            EVENTS[index] = event // op locatie van de id gaan we ons event updaten EVENTS[2] = {object}
        */
        //een put werkt hetzelfde als een post, je hoeft niet te checken op id want je stuurt het hele object mee
        return this.http.put<IEvent>('/api/events', event, options).pipe(catchError(this.handleError<IEvent>('updateEvent')));

    private errorhandler<T>(operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
    deleteEvent(id: number) {
        console.log(`eventservice>deleteEvent ` + id)
        return this.http.delete(`/api/events/${id}`).pipe(catchError(this.handleError<IEvent>(`delete van ${id}`)));
    }

    searchSessions(searchTerm: String): Observable<ISession[]> {
        return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm).pipe(catchError(this.handleError<ISession[]>(`searchsession`)));
    }
    //basic error handling
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}
