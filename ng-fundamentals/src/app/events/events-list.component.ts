import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

//dit doen we om typescript te laten weten dat dit gedeclareert is ergens anders (angular.json)
//[declare let toastr] --> dit is globaal, wat niet aangeraden is! 
@Component({
    //selector: 'events-list', dit hoeft niet meer, de routing komt hier automatisch
    template: `
    <div>    
        <h1>Upcoming angular events</h1>

        <hr/>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail [event]="event" ></event-thumbnail>
            </div>
        </div>


    </div>
    `
    //[event] tumbnail gaat de info van event1 uit deze component in de andere component stoppen event-thumbnail
    //eventClick moet dezelfde zijn als de @output in de childcomponent
})

//implements oninit is enkel nodig om typescript content te maken
export class EventListComponent implements OnInit {
    events: IEvent[]
    // injecteren van de service in deze component voor de rest doet de consturctor niks voor nu
    constructor(private eventService: EventService, private route:ActivatedRoute) { }
    ngOnInit() {
        // de events tussen de haakjes is dezelfde events die we terugvinden in de routes
        this.events = this.route.snapshot.data['events']
    }

}