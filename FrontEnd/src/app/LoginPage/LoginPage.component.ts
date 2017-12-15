import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpService } from '../NetworkBackEnd/http.service';
import { Response } from '@angular/http/src/static_response';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-root',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})

export class LoginPageComponent {

  logRegCounter = 0;
  title = 'app';
  styleString = "";
  constructor(private httpService: HttpService) { }
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
          }

        }
      }
    );
  }

  onSubmitRegister(form: NgForm) {
    this.httpService.registerUser(form.value).subscribe(
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
            divElement.appendChild(document.createTextNode(" Registration failed.. fill the data correctly ."));
            document.getElementById("RegForm").appendChild(divElement);
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
            divElement.appendChild(document.createTextNode("Registered Successfully."));
            document.getElementById("RegForm").appendChild(divElement);
            
          }

        }
      }
    );

  }

}
