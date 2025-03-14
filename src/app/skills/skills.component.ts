import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {


  frontentText:string = "Frontend Developer";
  backendText:string = "Backend Developer";

  arrayFrontend:any = ['HTML','CSS','SCSS','JAVASCRIPT','ANGULAR','BOOTSTRAP','GIT']
  arraybackend:any = ['C#','NodeJs','PHP','Python']
  

}
