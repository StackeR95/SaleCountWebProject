import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-main-page',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class MainPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    
   }

  ngOnInit() {
  }

}
