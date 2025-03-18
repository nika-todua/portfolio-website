import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {


  frontentText:string = "";
  backendText:string = "";
  toolsText:string = ""

  arrayFrontend:string[] = ['HTML','CSS','SCSS','JAVASCRIPT','ANGULAR','BOOTSTRAP','TAILWINDCSS','TYPESCRIPT']
  arrayTools:string[] = ['POSTMAN','GIT','Github']
  arraybackend:string[] = ['C#','NodeJs','PHP','Python']

  constructor(private api:ApisService){this.languageSistem()}
  

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.frontentText = languageArray.personspecialist;
          this.backendText = languageArray.backendTxt;
          this.toolsText = languageArray.toolsTxt
        })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;

          this.frontentText = languageArray.personspecialist;
          this.backendText = languageArray.backendTxt;
          this.toolsText = languageArray.toolsTxt
        })
      }
    }, 1);
  }

}
