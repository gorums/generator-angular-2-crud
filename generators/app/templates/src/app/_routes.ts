import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import {
    <% entities.forEach(function (entity) {%><%= entity.capitalize %>Container,
    <% })%>
    DashboardContainer,
    HomeContainer
} from './containers';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: DashboardContainer,
    children: [
        <% entities.forEach(function (entity) {%>{ path: '<%= entity.pluralizeUncapitalize %>', component: <%= entity.capitalize %>Container },<% })%>
        { path: '', component: HomeContainer }
    ]
  },
  { path: '**', redirectTo: '' }
]);
