import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`em{ float:right; color:#E05C65; padding-left:10px;}`]
})
export class LoginComponent {
    //dit moeten we doen om in productie te kunnen gaan. dit zijn de bindings met ngModel
    constructor(private authService: AuthService, private router: Router) { }
    userName
    password
    mouseoverLogin
    loginInvalid = false;
    login(formValues) {
        console.log(formValues);
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(
                resp => {
                    if (!resp) {
                        this.loginInvalid = true;
                    } else {
                        //navigeer naar de events pagina
                        this.router.navigate(['events']);
                    }
                })

    }
    cancel() {
        this.router.navigate(['events'])
    }
}