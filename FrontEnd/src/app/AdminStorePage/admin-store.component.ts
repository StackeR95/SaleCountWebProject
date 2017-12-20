import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpService } from '../NetworkBackEnd/http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminStoreComponent implements OnInit {
  imagePath :string;
  constructor(private httpService:HttpService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("storeID")=="0")
    {
      alert("You are not authorized to enter this page");
      this.router.navigate(['/homePage'])
    }
  }
  validateForm(form)
  {
    var itemName=form['name'];
    var description=form['discription'];
    var pic =form['pic'];
    var price=form['price'];
    var discount=form['discount'];
    var quantity=form['quantity']
    console.log(itemName.indexOf(' '));
    if(itemName.length==0 || itemName.indexOf(' ')==0)
    {
      this.showErrorMessage("Please Fill Item Name Field");
      return false;
    }
    if(description.length==0 || description.indexOf(' ')==0)
    {
      this.showErrorMessage("Please Fill Description Field ");
      return false;
    }
    if(price.length==0)
    {
      this.showErrorMessage("Please Fill Price  Field ");
      return false;
    }
    if(discount.length==0)
    {
      this.showErrorMessage("Please Fill Discount Field ");
      return false;
    }
    if(quantity.length==0)
    {
      this.showErrorMessage("Please Fill Quantity Field ");
      return false;
    }
    if(pic==undefined)
    {
      this.showErrorMessage("Please Upload Item Picture ");
      return false;
    }
    return true;
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
  addStoreItems(form:NgForm)
  {
    var myJson=form.value;
    if(this.validateForm(myJson))
    {
      myJson["storeId"]=localStorage.getItem("storeID");
      this.httpService.addStoreItems(myJson).subscribe((Response)=>{
        console.log(Response);
        if(Response.json()['success']==true)
        {
          this.showSuccessMessage("Item is added succesfully.");
        }
        else
        {
          this.showErrorMessage("Item is not added - > "+Response.json()['msg'])
        }
  
      })
    }

  }
  onChange(event)
  {
    var files = event.srcElement.files;
    console.log(files[0].name);
    this.imagePath="/assets/data/items/"+files[0].name;
    var imageUploaded=document.getElementById("img-upload");
    imageUploaded.setAttribute("src",this.imagePath);
    imageUploaded.setAttribute("style","display:block;");
  }
}
