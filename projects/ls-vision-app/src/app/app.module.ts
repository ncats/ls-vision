import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LsVisionModule } from 'projects/ls-vision/src/public-api';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LsVisionModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
