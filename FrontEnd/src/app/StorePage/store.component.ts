import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { Http } from "@angular/http";
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {
  newreleases: any;
  slideIndex = 1;
  constructor(private httpService: HttpService) {

  }

  ngOnInit() {
   // 
    this.httpService.getItemData(1, 1).subscribe((data) => 
    {
      console.log(data.json());
     var itemsJson=data.json();
     var imagesArr=[];
      var mainDiv=document.getElementById("mainDiv");
      for(var i=0;i<itemsJson.items.length;i++)
      {
        var temp=document.createElement("img");
        temp.className="mySlides";
        temp.setAttribute("src",itemsJson.items[i].pic);
        temp.setAttribute("style","width:100;display:none;");

        mainDiv.appendChild(temp);
      }
      
      var rowDiv;
      for(var i=0;i<itemsJson.items.length;i++)
      {
        if(i %3==0)
        {
          rowDiv=document.createElement("div");
          rowDiv.className="w3-row";
          mainDiv.appendChild(rowDiv);
        }
        var containerDiv=document.createElement("div");
        containerDiv.className="w3-third w3-container";
        var columnDiv=document.createElement("div");
        columnDiv.className="w3-col"
        var imageDiv=document.createElement("img");
        imageDiv.className="demo w3-opacity";
        imageDiv.setAttribute("src",itemsJson.items[i].pic);
        imageDiv.id=itemsJson.items[i].ID;
        imageDiv.setAttribute("alt",i.toString());
       // imageDiv.setAttribute("onclick","currentDiv("+itemsJson.items[i].ID+")");
        imageDiv.onclick=function()
        {
          var x = document.getElementsByClassName("mySlides");
          var dots = document.getElementsByClassName("demo");
          for (i = 0; i < x.length; i++) 
          {
            x[i].setAttribute("style","display:none;");
          }
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
           }
         
         
         x[parseInt(this.getAttribute("alt"))].setAttribute("style","display:block");

         dots[parseInt(this.getAttribute("alt"))].className += " w3-opacity-off";
        }
       
        columnDiv.appendChild(imageDiv);
        containerDiv.appendChild(columnDiv);
        rowDiv.appendChild(containerDiv);
       // 
      }
      
     // this.showDivs(this.slideIndex);
    })
    
  }
  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }
   currentDiv(n) {;
    this.showDivs(this.slideIndex = n);
  }
   showDivs(n) 
   {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].setAttribute("style","display:none;");
    }
    for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[this.slideIndex-1].setAttribute("style","display:block");

    dots[this.slideIndex-1].className += " w3-opacity-off";
  }

}
