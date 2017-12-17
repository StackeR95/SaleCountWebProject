import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginPageComponent } from './LoginPage/LoginPage.component';

import { AmexioWidgetModule,CommonHttpService } from "amexio-ng-extensions";
import { FormsModule } from "@angular/forms";
import { CarouselComponent } from './carousel.component';
import { HttpComponent } from './NetworkBackEnd/http.component';
import { HttpService } from './NetworkBackEnd/http.service';
import { HomePageComponent } from './HomePage/home-page.component';
import { HeaderComponent } from './HomePage/header.component';
import { StoreComponent } from './StorePage/store.component'
import { routing }from "./app.routes";
import { MainPageComponent } from './MainPage/main-page.component'
@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    LoginPageComponent,
    CarouselComponent,
    HttpComponent,
    HomePageComponent,
    HeaderComponent,
    StoreComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule,
    FormsModule,
    routing
  ],
  providers: [CommonHttpService,HttpService],
  bootstrap: [MainPageComponent]
})
export class AppModule { }
