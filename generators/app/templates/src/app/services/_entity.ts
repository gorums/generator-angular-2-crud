import { Injectable } from '@angular/core';
import { <%= entity.capitalize %>Model } from '../models'
import { ApiService } from '../api';
import { StoreHelper } from '../store/helper';
import 'rxjs/Rx';

@Injectable()
export class <%= entity.capitalize %>Service {

    path: string = '<%= relativeURI || '' %>/<%= entity.pluralizeUncapitalize %>';

    constructor(private apiService: ApiService,
                private storeHelper: StoreHelper) {}

    get<%= entity.pluralizeCapitalize %>() {
        return this.apiService.get(this.path)
                .do((res: any) => this.storeHelper.update('<%= entity.pluralizeUncapitalize %>', res.data));
    }

    get<%= entity.singularCapitalize %>(id) {
        return this.apiService.get(`${this.path}/${id}`)
                .do(<%= entity.singularUncapitalize %> => this.storeHelper.findAndUpdate('<%= entity.pluralizeUncapitalize %>', <%= entity.singularUncapitalize %>));
    }

    create<%= entity.capitalize %>(<%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model) {
        return this.apiService.post(this.path, <%= entity.singularUncapitalize %>)
                .do(saved<%= entity.singularCapitalize %>=> this.storeHelper.add('<%= entity.pluralizeUncapitalize %>', saved<%= entity.singularCapitalize %>));
    }

    edit<%= entity.capitalize %>(id: string, <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model) {
        return this.apiService.put(`${this.path}/${id}`, <%= entity.singularUncapitalize %>)
                 .do(edited<%= entity.singularCapitalize %> => this.storeHelper.findAndUpdate('<%= entity.pluralizeUncapitalize %>', edited<%= entity.singularCapitalize %>));
    }

    delete<%= entity.capitalize %>(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
             .do((res: any) => this.storeHelper.findAndDelete('<%= entity.pluralizeUncapitalize %>', res.id));
    }
};
