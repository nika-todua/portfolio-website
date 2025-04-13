import { Component } from '@angular/core';

@Component({
  selector: 'app-ads',
  standalone: false,
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})
export class AdsComponent {


  adsimage:string = 'https://picsum.photos/250/600?random';
  adsLink:string = 'https://www.google.com';
}
