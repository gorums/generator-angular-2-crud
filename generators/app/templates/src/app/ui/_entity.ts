import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {
  <% if(relations) {%><% relations.forEach(function (relation) {%><%= relation.capitalize %>Model,<% })%><% }%>
  <%= entity.capitalize %>Model
} from '../../models';

@Component({
    selector: '[<%= entity.singularUncapitalize %>-ui]',
    template: `
<% Object.keys(entity.entity).forEach(function(field){ if(!entity.entity[field].referent) { -%>
        <td>{{<%= entity.singularUncapitalize %>.<%= field %>}}</td>
<%} }) -%>        
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
<% Object.keys(entity.entity).forEach(function(field){ if(entity.entity[field].render) { -%>
        <td *ngIf="<%= relation.singularUncapitalize %>">{{<%= relation.singularUncapitalize %>.<%= entity.entity[field].render %> || "No <%= relation.singularCapitalize %>"}}</td>
<%} }) -%>
        <td *ngIf="!<%= relation.singularUncapitalize %>"></td>
<% }) -%>
<% } -%>        
        <td <%= entity.singularUncapitalize %>-edit-ui 
                [<%= entity.singularUncapitalize %>]="<%= entity.singularUncapitalize %>" 
<% if(relations) { -%> 
<% relations.forEach(function (relation) { -%>
                [<%= relation.pluralizeUncapitalize %>]="<%= relation.pluralizeUncapitalize %>"
<% }) -%>
<% } -%>
                (onEditHandler)="onEdit<%= entity.capitalize %>($event)">
        </td>
        <td <%= entity.singularUncapitalize %>-delete-ui 
            [<%= entity.singularUncapitalize %>]="<%= entity.singularUncapitalize %>"
            (onDeleteHandler)="onDelete<%= entity.capitalize %>($event)">
        </td>
    `
})
export class <%= entity.capitalize %> {
    @Input() <%= entity.singularUncapitalize %>: <%= entity.capitalize %>Model;
<% if(relations) { -%>
<% relations.forEach(function (relation) { -%>
    @Input() <%= relation.singularUncapitalize %>: <%= relation.capitalize %>Model;
    @Input() <%= relation.pluralizeUncapitalize %>: Array<<%= relation.capitalize %>Model>;
<% }) -%>
<% } -%>

    @Output() onEditHandler = new EventEmitter();
    @Output() onDeleteHandler = new EventEmitter();

    onEdit<%= entity.capitalize %>(data) {
        this.onEditHandler.next(data);
    }

    onDelete<%= entity.capitalize %>() {
        this.onDeleteHandler.next(this.<%= entity.singularUncapitalize %>.<%= entity.key %>);
    }
}
