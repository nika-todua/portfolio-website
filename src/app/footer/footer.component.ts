import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  versionYear:number = 2025
  coppyText:string = 'All rigths reserved.'

  // სასურველი ენაზე გადასვლის ფუნქცია
  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.coppyText = 'All rights reserved.'
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.coppyText = 'ყველა უფლება დაცულია.'
      }
    }, 1);
  }
  
  ngOnInit(){
    this.languageSistem()
  }
  
}
