import { Component } from '@angular/core';
import { UserModel, DoctorModel } from '../models';
import {
  DoctorService,
  <%= entity.capitalize %>Service
} from '../services';

import { Store } from '../store';
import 'rxjs/Rx';

@Component({
    selector: '<%= entity.pluralize %>-container',
    styles: [`
        .new-<%= entity.name %> {
            padding-top: 10px;
        }
    `],
    template: `
    <div>
        <h1><%= entity.plurCap %></h1>                    
            <<%= entity.name %>-create-ui 
                [doctors]="doctors"
                (onSaveHandler)="onCreateU<%= entity.capitalize %>($event)" >
            </<%= entity.name %>-create-ui>
    </div>
    <table class="table">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Doctor</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr <%= entity.name %>-ui *ngFor="let <%= entity.name %> of <%= entity.pluralize %>" 
                [<%= entity.name %>]="<%= entity.name %>" 
                [doctor]="getDoctor(user.doctorId)"
                [doctors]="doctors"
                (onEditHandler)="onEdit<%= entity.capitalize %>($event)"
                (onDeleteHandler)="onDelete<%= entity.capitalize %>$event)"
            >
            </tr>
        </tbody>
        </table> 
        
    `
})
export class <%= entity.capitalize %>Container {
  <%= entity.pluralize %>: <%= entity.capitalize %>Model[] = [];
  doctors: DoctorModel[] = [];

  constructor(private store: Store,
              private <%= entity.name %>Service: <%= entity.capitalize %>Service,
              private doctorService: DoctorService) {

        this.doctorService.getDoctors()
            .subscribe();

        this.<%= entity.plurnamealize %>Service.getU<%= entity.plurCap %>()
                .subscribe();

        this.store.changes.pluck('doctors')
            .subscribe((doctors: any) => this.doctors = doctors );

        this.store.changes.pluck('<%= entity.pluralize %>')
            .subscribe((<%= entity.pluralize %>: any) => this.<%= entity.pluralize %> = <%= entity.pluralize %> );
    }

    onCreate<%= entity.capitalize %>(<%= entity.name %>: <%= entity.capitalize %>Model) {
        this.<%= entity.name %>Service.create<%= entity.capitalize %>(<%= entity.name %>).subscribe();
    }

    onEdit<%= entity.capitalize %>(payload) {
        this.<%= entity.name %>Service.edit<%= entity.capitalize %>(payload.id, payload.<%= entity.name %>).subscribe();
    }

    onDelete<%= entity.capitalize %>(id: string) {
        this.<%= entity.name %>Service.delete<%= entity.capitalize %>(id).subscribe();
    }

    getDoctor(doctorId: string): DoctorModel {
        return this.doctors.find(d => d.id === doctorId);
    }
}
