import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
  <%= relation.capitalize %>Model,
<% }) -%>
<% } -%>
  <%= entity.capitalize %>Model
} from '../../models';

@Component({
    selector: '<%= entity.singularUncapitalize %>-create-ui',
    template: `
        <div>
            <div *ngIf="!addNew"><button class="btn btn-primary" (click)="onAddNew()">Add New <%= entity.singularCapitalize %></button></div>
            <form *ngIf="addNew">
<% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(!entity.entity[field].key && !entity.entity[field].referent) { -%>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label"><%= field %></label>
                  <div class="col-sm-10">
<% if (entity.entity[field].textArea) { -%>
                    <textarea name="<%= field %>" [(ngModel)]="<%= entity.singularUncapitalize -%>.<%= field %>" rows="10" cols="80"></textarea>
<% } else { -%>
                      <input type="<% if(entity.entity[field] === "boolean" || entity.entity[field].type === "boolean") { -%>checkbox"
<% } -%><% if(entity.entity[field] === "number" || entity.entity[field].type === "number") { -%>number"
<% } -%><% if(entity.entity[field] === "string" || entity.entity[field].type === "string") { -%>text"
<% } -%>              class="form-control" [(ngModel)]="<%= entity.singularUncapitalize %>.<%= field %>" name="<%= field %>"/>
<%} -%>
                  </div>
                </div>
<%} -%>
<% }) -%>
                
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><%= relation.singularCapitalize %></label>
                    <div class="col-sm-10">
<% Object.keys(entity.entity).forEach(function(field){ -%>
<% if(entity.entity[field].render && entity.entity[field].referent === relation.name ) { -%>
                        <select [(ngModel)]="<%= entity.singularUncapitalize %>.<%= field %>" name="<%= field %>">
                            <option *ngFor="let e of <%= relation.pluralizeUncapitalize %>" [ngValue]="e.<%= relation.key %>">{{e.<%= entity.entity[field].render %>}}</option>
                        </select>  
<% } -%>
<% }) -%>
                    </div>
                </div> 
<% }) -%>
<% } -%>            
                           
                <button class="btn btn-success" (click)="onSave()">Save</button>
                <button class="btn btn-default" (click)="onCancel()">Cancel</button>                
            </form>
       </div>
       <hr />       
    `
})
export class <%= entity.capitalize %>Create {
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>
    @Output() onSaveHandler = new EventEmitter();

    <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model = {
      <%= entity.key %>: ''<% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(!entity.entity[field].key && entity.entity[field].require) { -%>,
      <%= field %>: ''
<% } -%>
<% }) -%>
    };

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
      this.onSaveHandler.next(this.<%= entity.singularUncapitalize %>);
      this.reset();
    }

    reset() {
      this.<%= entity.singularUncapitalize %> = {
        <%= entity.key %>: ''<% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(!entity.entity[field].key && entity.entity[field].require) { -%>,
        <%= field %>: ''
<% } -%>
<% }) -%>
      };
    }
}
