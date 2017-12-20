import { Component, OnInit } from '@angular/core';
import { HttpService } from '../NetworkBackEnd/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  constructor(private httpService:HttpService) { }

  ngOnInit() {
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
