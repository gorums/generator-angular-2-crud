import { Component } from '@angular/core';
import { UserModel, DoctorModel } from '../models';
import { UserService, DoctorService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';

@Component({
    selector: 'users-container',
    styles: [`
        .new-user {
            padding-top: 10px;
        }
    `],    
    template: `
    <div>
        <h1>Users</h1>                    
            <user-create-ui 
                [doctors]="doctors"
                (onSaveHandler)="onCreateUser($event)" >
            </user-create-ui>
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
            <tr user-ui *ngFor="let user of users" 
                [user]="user" 
                [doctor]="getDoctor(user.doctorId)"
                [doctors]="doctors"
                (onEditHandler)="onEditUser($event)"
                (onDeleteHandler)="onDeleteUser($event)"
            >
            </tr>
        </tbody>
        </table> 
        
    `
})
export class UsersContainer {   
    users: UserModel[] = [];
    doctors: DoctorModel[] = [];
    
  constructor(private store: Store, private userService: UserService,
              private doctorService: DoctorService) {

        this.doctorService.getDoctors()
            .subscribe();

        this.userService.getUsers()
                .subscribe();    

        this.store.changes.pluck('doctors')
            .subscribe((doctors: any) => this.doctors = doctors );

        this.store.changes.pluck('users')
            .subscribe((users: any) => this.users = users );
    }

    onCreateUser(user: UserModel) {
        this.userService.createUser(user).subscribe();
    }

    onEditUser(payload) {
        this.userService.editUser(payload.id, payload.user).subscribe();
    }

    onDeleteUser(id: string) {
        this.userService.deleteUser(id).subscribe();
    }

    getDoctor(doctorId: string): DoctorModel {
        return this.doctors.find(d => d.id === doctorId);
    }
}