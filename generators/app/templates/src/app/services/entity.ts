import { Injectable } from '@angular/core';
import { DoctorModel } from '../models'
import { ApiService } from '../api';
import { StoreHelper } from '../store/helper';
import 'rxjs/Rx';

@Injectable()
export class DoctorService {

    path: string = '/api/doctors';
    
    constructor(private apiService: ApiService, 
                private storeHelper: StoreHelper) {}

    getDoctors() {
        return this.apiService.get(this.path)
                .do((res: any) => this.storeHelper.update('doctors', res.data));        
    }

    getDoctor(id) {
        return this.apiService.get(`${this.path}/${id}`)
                .do(doctor => this.storeHelper.findAndUpdate('doctors', doctor));        
    }

    createDoctor(doctor: DoctorModel) {
        return this.apiService.post(this.path, doctor)
                .do(savedDoctor => this.storeHelper.add('doctors', savedDoctor));
    }

    editDoctor(id: string, doctor: DoctorModel) {
        return this.apiService.patch(`${this.path}/${id}`, doctor)
                 .do(editedDoctor => this.storeHelper.findAndUpdate('doctors', editedDoctor));   
    }

    deleteDoctor(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
             .do((res: any) => this.storeHelper.findAndDelete('doctors', res.id));
    }
};