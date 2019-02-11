import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Toastr, TOASTR_TOKEN } from '../shared/toastr.service';


@Component({
  templateUrl:'./profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  private firstName:FormControl
  private lastName:FormControl


  constructor(
    private router: Router,
    private auth: AuthService,

    //we halen aan de hand van TOASTR_TOKEN de service zoeken in de dependency injection registry de :Toastr is puur voor de intellicense
    @Inject(TOASTR_TOKEN) private toastr: Toastr
    
    ){}


  ngOnInit(){
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required,Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.auth.currentUser.lastName, [Validators.required,Validators.pattern('[a-zA-Z].*')])
    //formgroup voor formcontrols
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }
  cancel(){
    this.router.navigate(['events']);
  }
  saveProfile(formValues){
    if(this.profileForm.valid){
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.toastr.success('Profile saved');
    }
    else{
      this.toastr.error('invalid');
    }

  }
  validateLastName(){
    return this.lastName.valid || this.lastName.untouched 
  }
  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched 
  }
}
