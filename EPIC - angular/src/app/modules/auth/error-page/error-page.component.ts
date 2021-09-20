import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class ErrorPageComponent implements OnInit {

  constructor() {
    const body = document.getElementsByTagName('body')[0];
    if (sessionStorage.getItem("modeSombre") === null || sessionStorage.getItem("modeSombre") != "") {
      sessionStorage.setItem("modeSombre", "true");
      body.classList.add('dark-mode');
    } else if(sessionStorage.getItem("modeSombre") != null && sessionStorage.getItem("modeSombre") == ""){
      body.classList.remove('dark-mode');
    }
  }

  ngOnInit(): void {
  }

}
