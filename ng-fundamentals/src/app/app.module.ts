import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JQ_TOKEN,CollapsableWellComponent,  SimpleModalComponent, ModalTriggerDirective, ToastService} from './shared/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { HttpClientModule } from '@angular/common/http';

import {
  EventListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  EventResolver,
  VoterService,
  UpvoteComponent,
  LocationValidator

}from './events/index'
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //routes inporteren in onze app
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsableWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
    
  ],//hier komen components + directives

  providers: [
    EventService,
    {provide: JQ_TOKEN, useValue: jQuery},
    {provide: EventListResolver, useClass: EventListResolver},// dit is hetzelfde als dat je gewoon EventRouteActivator zou schrijven bij de andere providers (useclass = wat we normaal doen)
    EventListResolver,
    EventResolver,
    AuthService,
    VoterService,
    ToastService,
    //wanneer provide gevraagd wordt, geef useValue om het te doen
    {provide: 'canDeactivateCreateEvent', useValue:checkDirtyState}
    
  ],//services komen hier
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
//functie om te testen of je gegevens ingevuld hebt op deze pagna
//als er nog iets in de component staat, krijg je een popup venster om te melden of je echt wel weg wil
export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty)
    return window.confirm('wilde echt weg?')
    //component is niet vuil, dan returnen we gewoon true
  return true
  
}