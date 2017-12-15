import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginPageComponent } from './LoginPage/LoginPage.component';

import { AmexioWidgetModule,CommonHttpService } from "amexio-ng-extensions";
import { FormsModule } from "@angular/forms";
import { CarouselComponent } from './carousel.component';
import { HttpComponent } from './NetworkBackEnd/http.component';
import {HttpService} from './NetworkBackEnd/http.service';
import { HomePageComponent } from './HomePage/home-page.component';
import { HeaderComponent } from './HomePage/header.component'

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    LoginPageComponent,
    CarouselComponent,
    HttpComponent,
    HomePageComponent,
    HeaderComponent
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
