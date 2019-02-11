import {Component, Input} from '@angular/core';

@Component({
    selector: 'collapsable-well',
    templateUrl: './collapsable-well.component.html'
})
export class CollapsableWellComponent{
    visible: boolean = true;

    toggleContent(){
        this.visible = !this.visible
    }

}

