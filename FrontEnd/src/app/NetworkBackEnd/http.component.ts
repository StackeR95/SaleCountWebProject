import { Component, OnInit } from '@angular/core';
import { HttpService }from './http.service';
import { Response } from '@angular/http/src/static_response';
@Component({
  selector: 'app-http',
  template :'',
  providers:[HttpService]
})
export class HttpComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit() 
  {

  }

}
