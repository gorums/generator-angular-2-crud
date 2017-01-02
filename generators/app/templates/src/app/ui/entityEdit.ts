import {
    Component, Output, Input, EventEmitter, OnInit
} from '@angular/core'

import {UserModel, DoctorModel } from '../../models';

@Component({
    selector: '[user-edit-ui]',
    template: `
        <button class="btn btn-default" data-toggle="modal" [attr.data-target]="'#modelEdit-' + user.id">Edit</button>
        
        <!-- Modal -->
        <div class="modal fade" [id]="'modelEdit-' + user.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Edit User</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Id</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" disabled [ngModel]="user.id" name="id"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" [(ngModel)]="editUser.name" name="name"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Address</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" [(ngModel)]="editUser.address" name="address"/>   
                                </div>
                            </div>  
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Doctor</label>
                                <div class="col-sm-10">
                                    <select [(ngModel)]="editUser.doctorId" name="doctorId">
                                        <option *ngFor="let d of doctors" [ngValue]="d.id">{{d.name}}</option>
                                    </select>  
                                </div>
                            </div>                            
                        </form> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" (click)="onSave()" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>       
    `
})
export class UserEdit  implements OnInit {
    @Input() user: UserModel;
    @Input() doctors: DoctorModel[];
    
    @Output() onEditHandler = new EventEmitter();

    editUser: UserModel;

    ngOnInit() {
        // clone the user object
        this.editUser = { 
            id: '', 
            name: this.user.name, 
            address: this.user.address, 
            doctorId: this.user.doctorId
        };      
    }

    onSave() {
        this.onEditHandler.next({id: this.user.id, user: this.editUser});
    }
}