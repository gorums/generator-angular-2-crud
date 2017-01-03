import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-container',
    styles: [`
        .sidebar {
            background: #225079;
            height: 600px;
            color: white;            
        },
        .model-containers {
            padding-top: 10px;
            text-align: justify;
        }
    `],
    template: `
       <div class="container">
        <div class="row">
            <div class="col-xs-3 sidebar">
                <h1 class="text-center">Dashboard</h1>
                <hr />
                <ul class="nav nav-pills nav-stacked">
                    <% entities.forEach(function (entity) {%>
                    <li>
                        <a><div [routerLink]="['', '<%= entity.pluralizeUncapitalize %>']"><%= entity.pluralizeCapitalize %></div></a>
                    </li>
                    <% })%>
                </ul>
            </div>
            <div class="col-xs-9">
                <router-outlet></router-outlet>
            </div>         
       </div>       
    </div>   
    `
})
export class DashboardContainer {}
