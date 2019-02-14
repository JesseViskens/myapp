import { Injectable } from "@angular/core";
import { ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


const options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
@Injectable()
export class VoterService {

    constructor(private http: HttpClient) { }


    deleteVoter(session: ISession, voterName: string, eventId:number) {
        // de nieuwe array bevat allle voters behalve degene bij wie de naam matcht
        session.voters = session.voters.filter(voter => voter !== voterName);
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        this.http.delete(url).pipe(catchError(this.handleError('deletevoter'))).subscribe();//selfsubscriben, in session list zijn we niks met de info
    }
    addVoter(session: ISession, voterName: string, eventId:number) {
        session.voters.push(voterName);

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.post(url, {}, options).pipe(catchError(this.handleError('addvoter'))).subscribe();
    }
    userHasVoted(session: ISession, voterName: string) {
        //some geeft een bolean terug.
        //als de username van voter bestaat krijgen we true terug. 
        return session.voters.some(voter => voter === voterName);
    }
    //basic error handling
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}