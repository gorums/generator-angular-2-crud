import { Injectable } from '@angular/core';
import { <%= entity.capitalize %>Model } from '../models'
import { ApiService } from '../api';
import { StoreHelper } from '../store/helper';
import 'rxjs/Rx';

@Injectable()
export class <%= entity.capitalize %>Service {

    path: string = '<%= relativeURI || '' %>/<%= entity.pluralize %>';

    constructor(private apiService: ApiService,
                private storeHelper: StoreHelper) {}

    get<%= entity.plurCap %>() {
        return this.apiService.get(this.path)
                .do((res: any) => this.storeHelper.update('<%= entity.pluralize %>', res.data));
    }

    getDoctor(id) {
        return this.apiService.get(`${this.path}/${id}`)
                .do(<%= entity.name %> => this.storeHelper.findAndUpdate('<%= entity.pluralize %>', doctor));
    }

    create<%= entity.capitalize %>(<%= entity.name %>: <%= entity.capitalize %>Model) {
        return this.apiService.post(this.path, <%= entity.name %>)
                .do(saved<%= entity.capitalize %>=> this.storeHelper.add('<%= entity.pluralize %>', saved<%= entity.capitalize %>);
    }

    edit<%= entity.capitalize %>(id: string, <%= entity.name %>: <%= entity.capitalize %>Model) {
        return this.apiService.patch(`${this.path}/${id}`, <%= entity.name %>)
                 .do(edited<%= entity.capitalize %> => this.storeHelper.findAndUpdate('<%= entity.pluralize %>', edited<%= entity.capitalize %>));
    }

    delete<%= entity.capitalize %>(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
             .do((res: any) => this.storeHelper.findAndDelete('<%= entity.pluralize %>', res.id));
    }
};
