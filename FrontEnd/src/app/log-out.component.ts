import { Component, OnInit } from '@angular/core';
import { HttpService } from './NetworkBackEnd/http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-out',
  template: `
    <p>
      Logging Out Please Wait
    </p>
  `,
  styles: []
})
export class LogOutComponent implements OnInit {

  constructor(private httpService:HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   
    this.httpService.logOutUser(localStorage.getItem("userID")).subscribe((Response)=>{
      console.log("Logging Out");
      console.log(Response);
      localStorage.clear();
      this.router.navigate(['']);
    })
  }

}
