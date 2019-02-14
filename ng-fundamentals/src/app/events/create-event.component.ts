import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { EventService } from './shared';

@Component({
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent{
    //we gaan kijken of de component dirty is of niet. deze functie roepen we op in de app.module functie die de createeventcomponent class aanspreekt
    isDirty:boolean = true
constructor(private router: Router, private eventService: EventService){}

    saveEvent(formValues){
        console.log(formValues);
        this.eventService.saveEvent(formValues).subscribe(() => {
        //we gaan zeggen dat het formulier niet meer dirty is, alle gegevens zijn dorgestuurd
        this.isDirty = false
        this.router.navigate(['/events'])
        })

    }

    cancel(){
        this.router.navigate(['/events'])
    }
}