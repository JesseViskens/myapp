import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'upvote',
    templateUrl:'./upvote.component.html',
    styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent{
    @Input() count: number;
    @Input() set voted(val){
        this.iconColor = val? 'red': 'white';
    };
    @Output() vote =  new EventEmitter();
    iconColor: string;

    constructor(){}

    onClick(){
        //we gaan vote uitzenden zodat andere componenten hier aan kunnen. we willen geen data meegeven dus geven we een leeg object
        this.vote.emit({});
    }

}