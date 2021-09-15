import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-error-page2',
  templateUrl: './error-page2.component.html',
  styleUrls: ['./error-page2.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class ErrorPage2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
