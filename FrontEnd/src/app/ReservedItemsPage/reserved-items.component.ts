import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserved-items',
  templateUrl: './reserved-items.component.html',
  styleUrls: ['./reserved-items.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReservedItemsComponent implements OnInit {
  constructor(private htttpService:HttpService,private router:Router) { }

  cancelReservation()
  {
    var itemID=localStorage.getItem("selectedItemID");
    var userID=localStorage.getItem("userID");
 //   console.log("user ID = "+userID+" itemID = "+itemID);
    this.htttpService.cancelReservation(userID,itemID).subscribe((Response)=>{

      try {
        var result = Response.json();
        if (result['success'] == false) {
          this.flag = !this.flag;
          document.getElementById("resultMessage").innerHTML = "An Error Occured :" + result['msg'];
        }
        else {
          this.flag = !this.flag;
          document.getElementById("resultMessage").innerHTML = "Reservation is canceled sucessfully";
          window.location.reload();
        }
      }
      catch (e) {
        console.log("Error in Resrved Items"+e);
      }

    })
  }
  ngOnInit() 
  {
    this.htttpService.getUserReservedItems().subscribe((Response)=>{
      
      var itemsJson = Response.json();
      if (itemsJson['success'] == true) 
      {
        localStorage.setItem("reservedItems",JSON.stringify(itemsJson.items));
        var mainDiv = document.getElementById("mainDiv");
        for (var i = 0; i < itemsJson.items.length; i++) {
          var temp = document.createElement("img");
          temp.className = "mySlides w3-border";
          temp.setAttribute("src", itemsJson.items[i].itemPic);
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
        labelData.id = "reservationDate"
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
          imageDiv.setAttribute("src", itemsJson.items[i].itemPic);
          imageDiv.id = itemsJson.items[i].itemId;
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
            var jsonData = JSON.parse(localStorage.getItem("reservedItems"));
     //       console.log(jsonData);
            var label = "Name : ";
            document.getElementById("name").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].itemName;
            label = "Descrption : ";
            document.getElementById("discrip").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].discription;
            label = "Price : ";
            document.getElementById("price").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].price;
            label = "Discount : ";
            document.getElementById("discount").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].discount;
            label = "Reservation Time : ";
            document.getElementById("reservationDate").innerHTML = label + jsonData[parseInt(this.getAttribute("alt"))].reservationDate;
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
        if(itemsJson["msg"].indexOf("token")!=-1) // the error is because of the token 
          {
            this.router.navigate(['']);
            alert("Cannot show you resereved items without logging in ..Please Login First") ; 
          }
        else 
           alert("No reserved items found");
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
