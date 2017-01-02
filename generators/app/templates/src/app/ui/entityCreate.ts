import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import { UserModel, DoctorModel } from '../../models';

@Component({
    selector: '<%= entity.name %>-create-ui',
    template: `
        <div>
            <div *ngIf="!addNew"><button class="btn btn-primary" (click)="onAddNew()">Add New <%= entity.capitalize %></button></div>
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
    @Input() doctors: Array<DoctorModel>;
    @Output() onSaveHandler = new EventEmitter();

    <%= entity.name %>: <%= entity.capitalize %>Model = {id: '', name: ''};
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
        this.onSaveHandler.next(this.<%= entity.name %>);
        this.reset();
    }

    reset() {
        this.<%= entity.name %> = {id: '', name: ''};
    }
}
