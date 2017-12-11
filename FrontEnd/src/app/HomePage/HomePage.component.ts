import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpService }from '../NetworkBackEnd/http.service';
import { Response } from '@angular/http/src/static_response';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-root',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css']
})

export class HomePageComponent    {
  
  logRegCounter=0;
  title = 'app';
  styleString="";
  constructor(private httpService:HttpService){}
  UserLogIn()
  {

    if(this.logRegCounter==0)
    {
      this.showLoginForm();

    }
    else
    {

      console.log("Sending Log In Data");
      // Send Data

    }
  }
 
  RegistrUser()
  {
    console.log("Counter = "+this.logRegCounter);
    if(this.logRegCounter==0)
    {
      this.showRegisterForm();
    }
    else
    {
        //Register User and Login 

    }
  }
  
   showLoginForm()
  {
   //this.logRegCounter++;
   this.styleString="showLogin";
   //document.getElementById("loginButton").style.visibility="hidden";
  /* var loginButton=document.getElementById("loginButton");
   loginButton.style.animationName="loginMove"; //  animation-name: loginButtonMove;
   loginButton.style.animationFillMode="forwards";
   loginButton.style.animationDuration="2s";*/

  }
  showRegisterForm()
  {
    this.logRegCounter++;
    this.styleString="showRegister";
    var regButton=document.getElementById("registerButton");
    regButton.style.animationName="regMove"; //  animation-name: loginButtonMove;
    regButton.style.animationFillMode="forwards";
    regButton.style.animationDuration="2s";

  }
  onSubmit(form:NgForm)
  {
   //console.log(JSON.stringify(form.value));
   console.log(form.value)
    this.httpService.sendLoginData(form.value).subscribe(
      (data)=>{
        var Res=data.json();
        if(Res["flag"]==false)
        {
          alert("Please Enter Valid Email & Password");
        }
        else
        {
          alert("You Are Logged In ");
        }
      }
    );
  }

  
}
