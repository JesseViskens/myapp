import { Injectable } from "@angular/core";
import { IUser } from './user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastService } from '../shared';


const options = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }
    )
};

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: HttpClient, private toastr: ToastService) { }



    loginUser(userName: string, password: string) {
        /*this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'Jesse',
            lastName: 'Viskens'
        }*/
        let loginInfo = { username: userName, password: password };

        return this.http.post('/api/login', loginInfo, options).pipe(tap(data => {
            this.currentUser = <IUser>data['user'];
        }))
    }
    isAuthenticated() {
        return !!this.currentUser;
    }
    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(
                data => {
                    if (data instanceof Object) {
                        this.currentUser = <IUser>data;
                    }
                }))
    }
    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        console.log('currentuserfirstname in authservice : '+this.currentUser.firstName)
        return this.http.put(`/api/users/${this.currentUser.id}`,this.currentUser, options)

    }
    logout(){
        return this.http.post('/api/logout',{}, options);
    }
    //basic error handling
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}