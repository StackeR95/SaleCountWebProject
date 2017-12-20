import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpService } from '../NetworkBackEnd/http.service';
import { Response } from '@angular/http/src/static_response';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})

export class LoginPageComponent {

  logRegCounter = 0;
  title = 'app';
  styleString = "";
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { 
    //this.route.params.subscribe(res => console.log(res)); 
  }
  UserLogIn() {
    this.styleString = "showLogin";

  }

  RegistrUser() {
    this.styleString = "showRegister";

  }
  backButtonPressed() {
    this.styleString = "";
  }
  onSubmitLogin(form: NgForm) {
    this.httpService.loginUser(form.value).subscribe(
      (data) => {
        var Res = data.json();
        if (Res["success"] == false) {
          if (document.getElementById("successAlert") != null) {
            document.getElementById("successAlert").remove();
          }
          if (document.getElementById("dangerAlert") == null) {
            var divElement = document.createElement("div");
            var aElement = document.createElement("a");
            var strongElement = document.createElement("strong");
            divElement.id = "dangerAlert";
            divElement.className = "alert alert-danger alert-dismissible";
            aElement.href = "#";
            aElement.className = "close";
            aElement.setAttribute("data-dismiss", "alert");
            aElement.setAttribute("aria-label", "close");
            aElement.innerHTML = "&times;";
            strongElement.innerHTML = "Error ! ";
            divElement.appendChild(aElement);
            divElement.appendChild(strongElement);
            divElement.appendChild(document.createTextNode("Invalid email or password."));
            document.getElementById("SignInForm").appendChild(divElement);
          }
        }
        else {
          if (document.getElementById("dangerAlert") != null) {
            document.getElementById("dangerAlert").remove();
          }
          if (document.getElementById("successAlert") == null) {
            var divElement = document.createElement("div");
            var aElement = document.createElement("a");
            var strongElement = document.createElement("strong");
            divElement.id = "successAlert";
            divElement.className = "alert alert-success alert-dismissible";
            aElement.href = "#";
            aElement.className = "close";
            aElement.setAttribute("data-dismiss", "alert");
            aElement.setAttribute("aria-label", "close");
            aElement.innerHTML = "&times;";
            strongElement.innerHTML = "Success ! ";
            divElement.appendChild(aElement);
            divElement.appendChild(strongElement);
            divElement.appendChild(document.createTextNode("Signed In Successfully."));
            document.getElementById("SignInForm").appendChild(divElement);
            localStorage.setItem("userID", Res['id']);
            localStorage.setItem("token", Res["token"]);
            localStorage.setItem("storeID", Res["storeOrNot"]);
            if (Res["storeOrNot"] != 0 && Res["storeOrNot"] != -1) 
            {
              setTimeout(() => { this.router.navigate(['addItems']); }, 2500)
            }
            else if (Res["storeOrNot"] == -1) 
            {
              setTimeout(() => {this.router.navigate(['createStore']);}, 2500)
            }
            else 
            {
              setTimeout(() => { this.router.navigate(['homePage']); }, 2500)
            }
          }

        }
      }
    );
  }
validateRegistrationInfo(form)
{

var firstName=form['fName'];
var lastName=form['lName'];
var email=form['email'];
var gender=form['gender'];
var password=form['password'];
var phoneNo=form['phoneNo'];
var address=form['address'];
if(firstName.length==0 ||firstName.indexOf(' ')!=-1)
{
  this.ShowDangerAlert("Please Fill Your First Name Correctly not empty or white spaces")
  return false;
}
if(lastName.length==0 ||lastName.indexOf(' ')!=-1)
{
  this.ShowDangerAlert("Please Fill Your Last Name Correctly not empty or white spaces")
  return false;
}
if(address.length==0 )
{
  this.ShowDangerAlert("Please Fill Your Address Field")
  return false;
}
if(gender!="F" && gender!="M" && gender!="f" && gender!="m")
{
  this.ShowDangerAlert("Please Fill Your Gender  Correctly ex: M ,F or m,f");
  return false;
}
var index=email.indexOf('@');

if(email.indexOf('@')==-1 || email.indexOf('.')==-1 ||email.indexOf('@')==0 ||email.indexOf('.')==0 ||(email.indexOf('.')==index+1))
{

  this.ShowDangerAlert("Please Fill Your Emaill address  Correctly ex:example@example.com");
  return false;
}
  //console.log(form);
return true;
}

  onSubmitRegister(form: NgForm) {
    if(this.validateRegistrationInfo(form.value))
    {
      this.httpService.registerUser(form.value).subscribe(
        (data) => {
          var Res = data.json();
          if (Res["success"] == false) {
            this.ShowDangerAlert(" Registration failed.. fill the data correctly may be duplicate email or missing info .")
          }
          else {
              this.showSuccessMessage("Registered Successfully.");
          }
        }
      );
    }
  }
  ShowDangerAlert(errorMessage)
  {
    if (document.getElementById("successAlert") != null) {
      document.getElementById("successAlert").remove();
    }
    if (document.getElementById("dangerAlert") == null) {
      var divElement = document.createElement("div");
      var aElement = document.createElement("a");
      var strongElement = document.createElement("strong");
      divElement.id = "dangerAlert";
      divElement.className = "alert alert-danger alert-dismissible";
      aElement.href = "#";
      aElement.className = "close";
      aElement.setAttribute("data-dismiss", "alert");
      aElement.setAttribute("aria-label", "close");
      aElement.innerHTML = "&times;";
      strongElement.innerHTML = "Error ! ";
      divElement.appendChild(aElement);
      divElement.appendChild(strongElement);
      divElement.appendChild(document.createTextNode(errorMessage));
      document.getElementById("RegForm").appendChild(divElement);
    }
  }
  showSuccessMessage(successMessage)
  {
    if (document.getElementById("dangerAlert") != null) {
      document.getElementById("dangerAlert").remove();
    }
    if (document.getElementById("successAlert") == null) {
      var divElement = document.createElement("div");
      var aElement = document.createElement("a");
      var strongElement = document.createElement("strong");
      divElement.id = "successAlert";
      divElement.className = "alert alert-success alert-dismissible";
      aElement.href = "#";
      aElement.className = "close";
      aElement.setAttribute("data-dismiss", "alert");
      aElement.setAttribute("aria-label", "close");
      aElement.innerHTML = "&times;";
      strongElement.innerHTML = "Success ! ";
      divElement.appendChild(aElement);
      divElement.appendChild(strongElement);
      divElement.appendChild(document.createTextNode(successMessage));
      document.getElementById("RegForm").appendChild(divElement);
  
    }
  
  }
}
