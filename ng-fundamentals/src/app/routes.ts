import {Routes} from '@angular/router';// dit doen we om wat meer intellisence te hebben op onze code
import { Error404Component } from './errors/404.component';
import {
    EventListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent

}from './events/index'
export const appRoutes:Routes = [
    //dit pad staat bewust eerst, aangezien events/new niet verschitl van events/id hierdoor gaan er fouten optreden. op deze mannier echter niet. 
    {path:'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events', component: EventListComponent, resolve:{events:EventListResolver}},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    {path:'events/session/new', component:CreateSessionComponent},
    //als er geen pad is moet je redirecten naar /events, hoe? prefix of full. full = fully matches, prefix url begint met het gespecifieerde deel (in dit geval '')
    {path:'', redirectTo: '/events', pathMatch: 'full'},
    //errorroute
    {path:'404', component: Error404Component },
    // diet doen we om en route te maken naar de user map
    {path:'user', loadChildren: './user/user.module#UserModule' }

]