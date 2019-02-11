import { Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ISession, restrictedWords } from '../shared';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styleUrls:['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit{
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelAddSession = new EventEmitter()
constructor(private route: Router){}
    


    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    ngOnInit(){
        this.name = new FormControl('',[Validators.required])
        this.presenter = new FormControl('',[Validators.required])
        this.duration = new FormControl('',[Validators.required])
        this.level = new FormControl('',[Validators.required])
        this.abstract = new FormControl('',[Validators.required, 
                                            Validators.maxLength(400),
                                            restrictedWords(['foo','bar'])
                                        ])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }




    saveSession(formValues){
        let session:ISession = {
            id: undefined,
            name: formValues.name,
            presenter: formValues.presenter,
            duration: +formValues.duration,
            level: formValues.level,
            abstract: formValues.abstract,
            voters: []
        }
//we sturen naar de savesession van de parent klasse (event-details) onze session zodat ze opgenomen kan worden in de lijst. we geven de session mee als parameter
        this.saveNewSession.emit(session)
    }
    cancel(){
        //emit zorgt ervoor dat we onze canceladdsession ook in de parent kunnen aanspreken (html van de parent, event-details)
        this.cancelAddSession.emit();
    }
}