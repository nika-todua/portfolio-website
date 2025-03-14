import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  versionYear:number = 2025
  coppyText:string = 'All rigths reserved.'
  
  constructor(private api : ApisService){this.languageSistem()}

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.coppyText = languageArray.coppy
        })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;

          this.coppyText = languageArray.coppy
        })
      }
    }, 1);
  }
  
}
