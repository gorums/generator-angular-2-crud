import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { UserModel, DoctorModel } from '../../models';

@Component({
    selector: '[<%= entity.name %>-ui]',
    template: `
        <th scope="row">{{user.id}}</th>
        <td>{{user.name}}</td>
        <td>{{user.address}}</td>
        <td *ngIf="doctor">{{doctor.name || "No Doctor"}}</td> 
        <td *ngIf="!doctor"></td>
        <td <%= entity.name %>-edit-ui 
                [<%= entity.name %>]="<%= entity.name %>" 
                [doctors]="doctors"
                (onEditHandler)="onEdit<%= entity.capitalize %>($event)">
        </td>
        <td <%= entity.name %>-delete-ui 
            [<%= entity.name %>]="<%= entity.name %>"
            (onDeleteHandler)="onDelete<%= entity.capitalize %>($event)">
        </td>
    `
})
export class <%= entity.capitalize %> {
    @Input() <%= entity.name %>: <%= entity.capitalize %>Model;
    @Input() doctor: DoctorModel;
    @Input() doctors: Array<DoctorModel>;

    @Output() onEditHandler = new EventEmitter();
    @Output() onDeleteHandler = new EventEmitter();

    onEdit<%= entity.capitalize %>(data) {
        this.onEditHandler.next(data);
    }

    onDelete<%= entity.capitalize %>() {
        this.onDeleteHandler.next(this.<%= entity.name %>.id);
    }
}
