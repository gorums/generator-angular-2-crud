import {
    Component, Output, Input, EventEmitter, OnInit
} from '@angular/core'

import {
  <% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Model,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Model
} from '../../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-edit-ui]',
    template: `
        <button class="btn btn-default" data-toggle="modal" [attr.data-target]="'#modelEdit-' + <%= entity.singularUncapitalize %>.<%= entity.key %>">Edit</button>
        
        <!-- Modal -->
        <div class="modal fade" [id]="'modelEdit-' + <%= entity.singularUncapitalize %>.<%= entity.key %>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Edit <%= entity.singularCapitalize %></h4>
                    </div>
                    <div class="modal-body">
                        <form>
<% Object.keys(entity.entity).forEach(function(field) { -%> 
<% if(!entity.entity[field].referent) { -%>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label"><%= field %></label>
                                <div class="col-sm-10">
<% if (entity.entity[field].textArea) { -%>
                                    <textarea name="<%= field %>" [(ngModel)]="edit<%= entity.singularCapitalize -%>.<%= field %>" rows="10" cols="55"></textarea>
<% } else { -%>
                                    <input type="<% if(entity.entity[field] === "boolean" || entity.entity[field].type === "boolean") { -%>checkbox"
<% } -%><% if(entity.entity[field] === "number" || entity.entity[field].type === "number") { -%>number"
<% } -%><% if(entity.entity[field].key || entity.entity[field] === "string" || entity.entity[field].type === "string") { -%>text"
<% } -%> class="form-control" 
<%if(entity.entity[field].key) { -%> 
                                    disabled [ngModel]="<%= entity.singularUncapitalize -%>
<%} else { -%>
                                    [(ngModel)]="edit<%= entity.singularCapitalize -%>
<%} -%>.<%= field %>" name="<%= field %>"/>
<% } -%>
                                </div>
                            </div>
<% } -%>
<% }) -%>
<% if(relations) {%><% relations.forEach(function (relation) {%>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label"><%= relation.singularCapitalize %></label>
                                <div class="col-sm-10">
<% Object.keys(entity.entity).forEach(function(field){ -%>
<% if(entity.entity[field].render && entity.entity[field].referent === relation.name ) { -%>                        
                                    <select [(ngModel)]="edit<%= entity.singularCapitalize %>.<%= field %>" name="<%= field %>">
                                        <option *ngFor="let e of <%= relation.pluralizeUncapitalize %>" [ngValue]="e.<%= relation.key %>">{{e.<%= entity.entity[field].render %>}}</option>
                                    </select> 
<% } -%>
<% }) -%>
                                </div>
                            </div>    
<% })%><% }%>
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
export class <%= entity.capitalize %>Edit  implements OnInit {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>

    @Output() onEditHandler = new EventEmitter();

    edit<%= entity.singularCapitalize %>: <%= entity.capitalize %>Model;

    ngOnInit() {
      // clone the user object
      this.edit<%= entity.singularCapitalize %> = {
        <%= entity.key %>: ''<% Object.keys(entity.entity).forEach(function(field) { -%>
<%if(!entity.entity[field].key) { -%>,
        <%= field %>: this.<%= entity.singularUncapitalize %>.<%=field %>
<% } -%>
<% }) -%>
      };
    }

    onSave() {
        this.onEditHandler.next({id: this.<%= entity.singularUncapitalize %>.<%= entity.key %>, <%= entity.singularUncapitalize %> : this.edit<%= entity.singularCapitalize %>});
    }
}
