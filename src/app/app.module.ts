import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageComponent } from './HomePage/HomePage.component';

import { AmexioWidgetModule,CommonHttpService } from "amexio-ng-extensions";
import { FormsModule } from "@angular/forms";
import { CarouselComponent } from './carousel.component';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    HomePageComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule,
    FormsModule
  ],
  providers: [CommonHttpService],
  bootstrap: [HomePageComponent]
})
export class AppModule { }
