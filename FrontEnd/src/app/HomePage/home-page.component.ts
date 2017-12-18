import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  constructor(private httpService: HttpService,private router:Router) { }
  storesJson: any;
  ngOnInit() 
  {
      this.httpService.getStoreData().subscribe((data)=>
      {
        this.storesJson=data.json();
        var containerDiv=document.createElement('div');
        var rowDiv=document.createElement('div');
        console.log(this.storesJson);
          for(var i =0;i<this.storesJson.Stores.length;i++)
          {
            var colDiv=document.createElement('div');
            var storeImage=document.createElement('img');
            var middleDiv=document.createElement('div');
            var linkDiv=document.createElement('a');
            var textDiv=document.createElement('div')
            containerDiv.className="container";
            rowDiv.className="row";
            colDiv.className="col";
            storeImage.className="image";
            middleDiv.className="middle";
            textDiv.className="text";
            if(i %3==0)
            {
              var rowDiv=document.createElement('div');
              rowDiv.className="row";
              containerDiv.appendChild(rowDiv);
            }
            storeImage.setAttribute("src",this.storesJson.Stores[i].pic)
            storeImage.setAttribute("style","width:100%")
            storeImage.id=this.storesJson.Stores[i].ID;
            colDiv.appendChild(storeImage);
            textDiv.innerHTML=this.storesJson.Stores[i].name;
            linkDiv.setAttribute("href","/store/"+storeImage.id);
            linkDiv.appendChild(textDiv)
            middleDiv.appendChild(linkDiv);
            colDiv.appendChild(middleDiv);
            containerDiv.lastChild.appendChild(colDiv);
            document.getElementById("header").appendChild(containerDiv);
            
          }
        
      
      })

  }

}
