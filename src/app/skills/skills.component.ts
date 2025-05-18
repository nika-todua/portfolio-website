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
  toolsText:string = ""

  arrayFrontend:string[] = ['HTML','CSS','SCSS','JAVASCRIPT','ANGULAR','BOOTSTRAP','TAILWINDCSS','TYPESCRIPT']
  arrayTools:string[] = ['POSTMAN','GIT','Github']

  
  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.frontentText = 'Frontend Developer';
        this.toolsText = 'Tools'
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
          this.frontentText = 'Frontend დეველოპერი';
          this.toolsText = 'ხელსაწყოები'
      }
    }, 1);
  }

  ngOnInit(){
    this.languageSistem()
  }

}
