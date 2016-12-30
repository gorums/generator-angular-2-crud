import { Component } from '@angular/core';
import { DoctorModel } from '../models';
import { DoctorService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';

@Component({
    selector: 'doctors-container',
    styles: [`
        .ul-doctor{
            padding-top: 20px;
        }
    `],
    template: `
    <div>
        <h1>Doctors</h1>
        <doctor-create-ui 
            (onSaveHandler)="onCreateDoctor($event)" >
        </doctor-create-ui>
    </div>
    <table class="table">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr doctor-ui *ngFor="let doctor of doctors" 
                [doctor]="doctor"
                (onEditHandler)="onEditDoctor($event)"
                (onDeleteHandler)="onDeleteDoctor($event)"
            >
            </tr>
        </tbody>
        </table>       
    `,
})
export class DoctorsContainer {
    doctors: DoctorModel[] = [];
    
  constructor(private store: Store, private doctorService: DoctorService) {
    this.doctorService.getDoctors()
        .subscribe();

    this.store.changes.pluck('doctors')
        .subscribe((doctors: any) => this.doctors = doctors);
  }

  onCreateDoctor(doctor: DoctorModel) {
    this.doctorService.createDoctor(doctor).subscribe();
  }

    onEditDoctor(payload) {
        this.doctorService.editDoctor(payload.id, payload.doctor).subscribe();
    }

  onDeleteDoctor(id: string) {
    this.doctorService.deleteDoctor(id).subscribe();
  }
}