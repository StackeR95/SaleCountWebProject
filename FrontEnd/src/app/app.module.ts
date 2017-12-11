import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageComponent } from './HomePage/HomePage.component';

import { AmexioWidgetModule,CommonHttpService } from "amexio-ng-extensions";
import { FormsModule } from "@angular/forms";
import { CarouselComponent } from './carousel.component';
import { HttpComponent } from './NetworkBackEnd/http.component';
import {HttpService} from './NetworkBackEnd/http.service'
@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    HomePageComponent,
    CarouselComponent,
    HttpComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule,
    FormsModule
  ],
  providers: [CommonHttpService,HttpService],
  bootstrap: [HomePageComponent]
})
export class AppModule { }
