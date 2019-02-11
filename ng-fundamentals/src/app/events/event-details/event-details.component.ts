import { Component, OnInit } from "@angular/core";
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared';

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right: 20px;}
    .event-image { height: 100px; }
    a {cursor:pointer}
`]
})

// url zal zijn: /events/1
export class EventDetailsComponent implements OnInit{
    addMode: boolean
    event:IEvent
    filterBy: string = 'all'//we zetten standaard onze filter op toon alles
    sortBy:string = 'votes';
    visibleSessions: ISession[] = [];


    constructor(private eventService: EventService, private route: ActivatedRoute){}
    ngOnInit(){
        console.log('oninit')
        //dit geeft ons de parameters die met de url meekomen  vv
        //this.eventService.getEvent(this.route.snapshot.params['id'])

        // de + is het casten naar een number binnen angular
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    }
    addSession(){
        //aangeven of er geflagt is of niet
        this.addMode = true
    }
    saveNewSession(session:ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id)); //geeft ons de hoogste session id

        session.id = nextId +1//voeg id toe aan de huidige session
        this.event.sessions.push(session) //duw het objet naar sessions (voeg het toe aan den array)
        this.eventService.updateEvent(this.event)// we updaten het event, wat neer komt op dat we het event gaan updaten. 
                                                 //(we voegen eigenlijk enkel een session toe, kan ook updtaen worden)
        this.addMode = false

        console.log(session)
    }
    cancelAddSession(){
        this.addMode = false
    }
}