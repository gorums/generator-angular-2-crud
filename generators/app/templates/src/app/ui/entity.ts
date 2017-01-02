import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { UserModel, DoctorModel } from '../../models';

@Component({
    selector: '[user-ui]',
    template: `
        <th scope="row">{{user.id}}</th>
        <td>{{user.name}}</td>
        <td>{{user.address}}</td>
        <td *ngIf="doctor">{{doctor.name || "No Doctor"}}</td> 
        <td *ngIf="!doctor"></td>
        <td user-edit-ui 
                [user]="user" 
                [doctors]="doctors"
                (onEditHandler)="onEditUser($event)">
        </td>
        <td user-delete-ui 
            [user]="user"
            (onDeleteHandler)="onDeleteUser($event)">
        </td>
    `
})
export class User {
    @Input() user: UserModel;
    @Input() doctor: DoctorModel;
    @Input() doctors: Array<DoctorModel>;

    @Output() onEditHandler = new EventEmitter();
    @Output() onDeleteHandler = new EventEmitter();    

    onEditUser(data) {
        this.onEditHandler.next(data);
    }

    onDeleteUser() {
        this.onDeleteHandler.next(this.user.id);
    }   
}