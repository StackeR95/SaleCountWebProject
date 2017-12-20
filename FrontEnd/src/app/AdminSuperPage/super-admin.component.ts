import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuperAdminComponent implements OnInit {
  imagePath :string;
  constructor(private httpService:HttpService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("storeID")!="-1")
    {
      alert("You are not authorized to enter this page");
      this.router.navigate(['/homePage'])
    }
  }
  validateForm(form)
  {
    var storeName=form['name'];
    var description=form['discription'];
    var pic =form['pic'];
    var email=form['email'];
    var address=form['address'];
    var phoneNo=form['phoneNo']
    if(storeName.length==0 || storeName.indexOf(' ')==0)
    {
      this.showErrorMessage("Please Fill Store Name Field");
      return false;
    }
    if(description.length==0 || description.indexOf(' ')==0)
    {
      this.showErrorMessage("Please Fill Description Field ");
      return false;
    }
    if(email.length==0)
    {
      this.showErrorMessage("Please fill email field ");
      return false;
    }
    if(address.length==0)
    {
      this.showErrorMessage("Please Fill address Field ");
      return false;
    }
    if(phoneNo.length==0)
    {
      this.showErrorMessage("Please Fill Phone Number Field ");
      return false;
    }
    if(pic==undefined)
    {
      this.showErrorMessage("Please Upload Item Picture ");
      return false;
    }
    return true;
  }
  addStore(form:NgForm)
  {
    if(this.validateForm(form.value))
    {
      this.httpService.addNewStore(form.value).subscribe((Response)=>{
        var Result=Response.json();
        if(Result['success']==false)
        {
          this.showErrorMessage(Result['msg'])
        }
        else
        {
          this.showSuccessMessage("Store is Added succesfully.");
        }
      })
    }
    
  }
  onChange(event)
  {
    var files = event.srcElement.files;
    console.log(files[0].name);
    this.imagePath="/assets/data/pics/"+files[0].name;
    var imageUploaded=document.getElementById("img-upload");
    imageUploaded.setAttribute("src",this.imagePath);
    imageUploaded.setAttribute("style","display:block;");
  }
  showSuccessMessage(successMessage)
  {
    var alertM=document.getElementById("responseDiv");
    alertM.setAttribute("style","visibility:visible");
    alertM.className="alert alert-success alert-dismissable"
    var message=document.getElementById("responseMessage");
    message.innerHTML="<strong> Done</strong> "+successMessage;
    message.className="fa fa-thumbs-o-up";
    alertM.scrollIntoView();
  }
  showErrorMessage(message)
  {
    var alertM=document.getElementById("responseDiv");
    alertM.setAttribute("style","visibility:visible");
    alertM.className="alert alert-danger alert-dismissable"
    document.getElementById("responseMessage").innerHTML="<strong>Error</strong> "+message;
    alertM.scrollIntoView();
  }

 
}
