import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IEvent } from './shared';


@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date: {{event?.date | date:'mediumDate'}}</div>
        <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early start)</span>
            <span *ngSwitchDefault>(Normal start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late start)</span>
        
        </div>
        <div>Price: {{ event?.price | currency:'USD' }}</div>
        <div [hidden]="!event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">
            Online URL: {{event?.onlineUrl}}
        </div>
    </div>
    `,
    /*
    [routerLink]="['/events', event.id]" <- we gaan navigeren naar /events en voegen er de parameter event.id aan toe => BVB:  /events/1 
    
    
    */
    //[hidden]="!event?.location"
    //we gaan het onderdeel verbergen als er geen locatie gevonden is
    //
    //
    //*ngIf="event?.onlineUrl" 
    //de ngif gaat kijken of er een online url is, indien niet wordt dit niet getoont. het vraagteken zorgt dat indien het veld in de db niet ingevuld is
    //er geen errors komen maar het gewoon niet getoont wordt.
    styles: [`
        .thumbnail { min-height: 210px}
        .pad-left {margin-left: 10px;}
        .well div {color: #bbb; }
    `]
})

export class EventThumbnailComponent{
    @Input() event:IEvent;// het maakt ni uit wat er binnenkomt in event (any) @input zegt dat dit event van een ander event binnenkomt.

    getStartTimeStyle():any{
       /* const isEarlyStart = this.event && this.event.time === '8:00 am'
        return {green: isEarlyStart, bold: isEarlyStart}*/
        
        if (this.event && this.event.time === '8:00 am')
            return {color: '#003300', 'font-weight': 'bold' }
        return {}

        /*OF
        if(this.event && this.event.time === '8:00 am)
            return 'green bold'
        return ''
        
        */ 
    }

}