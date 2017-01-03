import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import { UserModel, DoctorModel } from '../../models';

@Component({
    selector: '<%= entity.singularUncapitalize %>-create-ui',
    template: `
        <div>
            <div *ngIf="!addNew"><button class="btn btn-primary" (click)="onAddNew()">Add New <%= entity.singularCapitalize %></button></div>
            <form *ngIf="addNew">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" [(ngModel)]="user.name" name="name"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" [(ngModel)]="user.address" name="address"/>   
                    </div>
                </div>  
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Doctor</label>
                    <div class="col-sm-10">
                        <select [(ngModel)]="user.doctorId" name="doctorId">
                            <option *ngFor="let d of doctors" [ngValue]="d.id">{{d.name}}</option>
                        </select>  
                    </div>
                </div>            
                <button class="btn btn-success" (click)="onSave()">Save</button>
                <button class="btn btn-default" (click)="onCancel()">Cancel</button>                
            </form>
       </div>
       <hr />       
    `
})
export class <%= entity.capitalize %>Create {
    <% if(relations) {%><% relations.forEach(function (relation) {%>
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
    <% })%><% }%>
    @Output() onSaveHandler = new EventEmitter();

    <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model = {id: '', name: ''};
    addNew: boolean = false;

    onAddNew() {
        this.addNew = true;
    }

    onCancel() {
        this.addNew = false;
        this.reset();
    }

    onSave() {
        this.addNew = false;
        this.onSaveHandler.next(this.<%= entity.singularUncapitalize %>);
        this.reset();
    }

    reset() {
        this.<%= entity.singularUncapitalize %> = {id: '', name: ''};
    }
}
