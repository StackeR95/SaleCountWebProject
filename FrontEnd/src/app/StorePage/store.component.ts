import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { Http } from "@angular/http";
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {

  slideIndex = 1;
  storeID: any;
  public max:number = 5;
  public rate:number = 1;
  public isReadonly:boolean = false;
  public isPercent:boolean = true;
  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.storeID = parseInt(activatedRoute.snapshot.params['storeId']);
  }
  ratedStore()
  {
    this.isReadonly=true;
    var userID=localStorage.getItem("userID");
    this.httpService.RateStore(userID,this.storeID,this.rate).subscribe((Response)=>{
      console.log(Response);
    })
  }
  ngOnInit() {
    this.httpService.getItemData(this.storeID).subscribe((data) => {
      var itemsJson = data.json();
      if (itemsJson['success'] == true) 
      {
        if(itemsJson.rated==true)
        {
          this.rate=itemsJson.rating|0;
          this.isReadonly=true;
        }
        localStorage.setItem("itemsData", JSON.stringify(itemsJson.items));
        var mainDiv = document.getElementById("mainDiv");
        for (var i = 0; i < itemsJson.items.length; i++) {
          var temp = document.createElement("img");
          temp.className = "mySlides w3-border";
          temp.setAttribute("src", itemsJson.items[i].pic);
          temp.setAttribute("style", "width:100;display:none;");
          mainDiv.appendChild(temp);
        }
        var dataDiv = document.createElement("div");
        dataDiv.className = "form-group w3-border";
        var labelData = document.createElement("p");
        labelData.id = "name"
        dataDiv.appendChild(labelData);
        var labelData = document.createElement("p");
        labelData.id = "discrip"
        dataDiv.appendChild(labelData);
        var labelData = document.createElement("p");
        labelData.id = "price"
        dataDiv.appendChild(labelData);
        var labelData = document.createElement("p");
        labelData.id = "discount"
        dataDiv.appendChild(labelData);
        var labelData = document.createElement("p");
        labelData.id = "quantity"
        dataDiv.appendChild(labelData);
        dataDiv.appendChild(document.getElementById("reserveButton"));
        dataDiv.setAttribute("style", "display:none;")
        mainDiv.appendChild(dataDiv);
        var rowDiv;
        for (var i = 0; i < itemsJson.items.length; i++) {
          if (i % 3 == 0) {
            rowDiv = document.createElement("div");
            rowDiv.className = "w3-row";
            mainDiv.appendChild(rowDiv);
          }
          var containerDiv = document.createElement("div");
          containerDiv.className = "w3-third w3-container";
          var columnDiv = document.createElement("div");
          columnDiv.className = "w3-col"
          var imageDiv = document.createElement("img");
          imageDiv.className = "demo w3-opacity";
          imageDiv.setAttribute("src", itemsJson.items[i].pic);
          imageDiv.id = itemsJson.items[i].ID;
          imageDiv.setAttribute("alt", i.toString());

          imageDiv.onclick = function () {
            localStorage.setItem("selectedItemID", this.id);
            var x = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("demo");
            for (i = 0; i < x.length; i++) {
              x[i].setAttribute("style", "display:none;");
            }
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
            }
            var jsonData = JSON.parse(localStorage.getItem("itemsData"));
            var label = "Name : ";
            document.getElementById("name").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].name;
            label = "Description : ";
            document.getElementById("discrip").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].discription;
            label = "Price : ";
            document.getElementById("price").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].price;
            label = "Discount : ";
            document.getElementById("discount").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].discount;
            label = "Quantity : ";
            document.getElementById("quantity").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].quantity;
            document.getElementById("reserveButton").setAttribute("style", "display:block;")
            x[parseInt(this.getAttribute("alt"))].setAttribute("style", "display:block");
            dataDiv.setAttribute("style", "display:block;")
            dots[parseInt(this.getAttribute("alt"))].className += " w3-opacity-off";

            document.getElementById("mainDiv").scrollIntoView();
          }

          columnDiv.appendChild(imageDiv);
          containerDiv.appendChild(columnDiv);
          rowDiv.appendChild(containerDiv);
        }
      }
      else{
        if(itemsJson["msg"].indexOf("token")!== -1) // the error is because of the token 
          {
           
            alert("Cannnot Show You Store Data Without Logging in ,,Please Login First") ; 
            this.router.navigate(['']);
          }
        else 
           alert("No Avaliable Items For This Store");
      }
     
    })

  }
  reserveItem() {
    console.log("Item Reserve Function ");
    try {
      var itemID = localStorage.getItem("selectedItemID");
      var userID = localStorage.getItem("userID");
      console.log(userID);
    }
    catch (e) {
      console.log("Error Type " + e);
    }

    this.httpService.reserveItem(userID, itemID).subscribe((response) => {

      try {
        var result = response.json();
        if (result['success'] == false) {
          this.flag = !this.flag;
          document.getElementById("resultMessage").innerHTML = "An Error Occured :" + result['msg'];
        }
        else {
          this.flag = !this.flag;
          document.getElementById("resultMessage").innerHTML = "Item reserved successfully ";
          window.location.reload();
        }
      }
      catch (e) {
        console.log(e);
      }

    })
  }
  flag: boolean;
  alertStatus: string;

  toggle() {
    this.flag = !this.flag;
  }

  checkStatus(v) {
    this.alertStatus = v;
  }

}
