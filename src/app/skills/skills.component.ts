import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  ngOnInit(){
    this.languageSistem();
  };

  skillobject:any = [
    {
      title: '',
      skill: [
        'HTML','CSS','SCSS','JAVASCRIPT','ANGULAR','BOOTSTRAP','TAILWINDCSS','TYPESCRIPT'
      ]
    },
    {
      title: '',
      skill: [
        'POSTMAN','GIT','GITHUB'
      ]
    }
  ]
  

  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.skillobject[0].title = 'Frontend development';
        this.skillobject[1].title = 'Tools';
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.skillobject[0].title = 'Frontend დეველოპმენტი';
        this.skillobject[1].title = 'ხელსაწყოები';
      }
    }, 1);
  };

}
