import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate{
    constructor(private eventService: EventService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot){
        //alshet evenement bestaat voegen we het toe aan de lijst eventExists. let op het + tele, voor onze parameters bij de functie, dit duid op een number
        const eventExists = !!this.eventService.getEvent(+route.params['id'])
        //alles dat niet op de lijst event staat
        if(!eventExists)
            this.router.navigate(['/404'])
        return eventExists
    }
}