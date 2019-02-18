import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../shared';

@Component({
    templateUrl: './login.component.html',
    styles: [`em{ float:right; color:#E05C65; padding-left:10px;}`]
})
export class LoginComponent {
    //dit moeten we doen om in productie te kunnen gaan. dit zijn de bindings met ngModel
    constructor(private authService: AuthService, private router: Router, private toastr: ToastService) { }
    userName
    password
    mouseoverLogin
    loginInvalid = false;
    login(formValues) {
        console.log(formValues);
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(
                resp => {
                    this.router.navigate(['events']);
                },
                (error: HttpErrorResponse)=>{
                    this.loginInvalid = true;
                    console.log("component "+ error.status)
                    if(error.status == 403)
                    {
                        this.toastr.error(error.statusText.toString(),`an error occured (${error.status})`)
                    }

                })

    }
    cancel() {
        this.router.navigate(['events'])
    }
}