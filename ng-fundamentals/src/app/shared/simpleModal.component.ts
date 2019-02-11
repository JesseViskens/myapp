import { Component, Input } from "@angular/core";


@Component({
    selector: 'simple-modal',
    templateUrl: './simpleModal.component.html',
    styles: [`
        .modal-body{ height:250px; overflo-y: scroll;}
    `]
})
export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
}