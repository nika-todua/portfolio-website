import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  frontentText:string = "";
  toolsText:string = "";

  arrayFrontend:string[] = ['HTML','CSS','SCSS','JAVASCRIPT','ANGULAR','BOOTSTRAP','TAILWINDCSS','TYPESCRIPT'];
  arrayTools:string[] = ['POSTMAN','GIT','GITHUB'];

  
  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.frontentText = 'Frontend development';
        this.toolsText = 'Tools';
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
          this.frontentText = 'Frontend დეველოპმენტი';
          this.toolsText = 'ხელსაწყოები';
      }
    }, 1);
  };

  ngOnInit(){
    this.languageSistem();
  };

}
