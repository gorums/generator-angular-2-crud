import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { App, providers, routes, containers, ui } from './app';

@NgModule({
    declarations: [
        App,
        ...containers,
        ...ui
    ],
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        routes
    ],
    providers,
    bootstrap: [App]
})
export class AppModule {};

platformBrowserDynamic().bootstrapModule(AppModule);