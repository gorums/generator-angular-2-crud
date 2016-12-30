import { Injectable } from '@angular/core';
import { UserModel } from '../models'
import { ApiService } from '../api';
import { StoreHelper } from '../store/helper';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    
    path: string = '/api/users';

    constructor(private apiService: ApiService, private storeHelper: StoreHelper) {}

    getUsers() {        
        return this.apiService.get(this.path)
                .do((res: any) => this.storeHelper.update('users', res.data));
    }

    getUser(id) {        
        return this.apiService.get(`${this.path}/${id}`)
                .do(user => this.storeHelper.findAndUpdate('users', user));
    }

    createUser(user: UserModel) {
        return this.apiService.post(this.path, user)
                .do(savedUser => this.storeHelper.add('users', savedUser));
    }

    editUser(id: string, user: UserModel) {
        return this.apiService.patch(`${this.path}/${id}`, user)
                .do(editedUser => this.storeHelper.findAndUpdate('users', editedUser));
    }

    deleteUser(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
                .do((res: any) => this.storeHelper.findAndDelete('users', res.id));
    }
};