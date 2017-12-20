import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  userType:any;
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    console.log(localStorage.getItem("storeID"));
    if(localStorage.getItem("storeID")=="0")
    {
      this.userType="normal";
    }
    else if(localStorage.getItem("storeID")=="-1")
    {
      this.userType="superAdmin";
    }
    else
    {
      this.userType="storeAdmin";
    }
    console.log(this.userType)
    this.httpService.getUserData().subscribe((Response)=>{
      var Result=Response.json();
      if(Result['success']==true)
      {
        var Name=Result.UserDetails['fName']+" "+Result.UserDetails['lName'];
        this.userName=Name;
      }

    })
   
  }

}
