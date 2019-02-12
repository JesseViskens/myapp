import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import {map} from 'rxjs/operators';


@Injectable()
export class EventListResolver implements Resolve<any>{

constructor(private eventService: EventService){}
    resolve(){
        //we roepen getEvents op, die een observable gaat teruggeven, daarna gaan we alles dat gelukt is erin stoppen

        //we gebruiken map omdat we de observable moeten teruggeven. 
        //we hadden ook subscribe kunnen gebruiken maar die gaf geen observable terug. map doet hetzelfde, maar geeeft wel de observable terug
        return this.eventService.getEvents()   
    }
}