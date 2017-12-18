import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  fName :string;
  lName :string;
  address: string;
  email :string;
  phoneNo:string;
  gender:string;
  password:string;
  userID:string;
  password2:string;
  profileUpdate :FormGroup;
  constructor(private httpService: HttpService) 
  {
    
   }

  ngOnInit() {
    this.httpService.getUserData().subscribe((response)=>{
      var Result=response.json();
      this.userID=Result.UserDetails.ID;
      this.fName=Result.UserDetails.fName;
      this.lName=Result.UserDetails.lName;
      this.address=Result.UserDetails.address;
      this.email=Result.UserDetails.email;
      this.phoneNo=Result.UserDetails.phoneNo;
      this.gender=Result.UserDetails.gender;
    })
  }
  submitNewChanges(form:any)
  {
    console.log(form);
    var userData={
      "fName":this.fName,
      "lName":this.lName,
      "email":this.email,
      "password":this.password,
      "address":this.address,
      "gender":this.gender,
      "phoneNo":this.phoneNo,
      "ID":this.userID
    }
    if(this.validateInput())
    {
      this.httpService.updateUserData(userData).subscribe(
        (Result) => {
          console.log(Result);
        })
    }

  }
  validateInput()
  {
 if(this.password!=this.password2)
 {
   var alertM=document.getElementById("responseDiv");
   alertM.setAttribute("style","visibility:visible");
   alertM.className="alert alert-danger alert-dismissable"
   document.getElementById("responseMessage").innerHTML="<strong>Error</strong>. Passwords doesn't match.";
   return false;
 }
 else
 {
  var alertM=document.getElementById("responseDiv");
  alertM.setAttribute("style","visibility:visible");
  alertM.className="alert alert-success alert-dismissable"
  
  var message=document.getElementById("responseMessage");
  message.innerHTML="<strong> Done</strong>. Data is updated succesfully.";
  message.className="fa fa-thumbs-o-up";
  return true;
 }
 
  }
}
