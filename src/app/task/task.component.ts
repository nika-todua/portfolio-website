import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  projectbtnClass:string = 'btnActive'
  skillbtnClass:string = ''

  componentShowHidden:boolean = false

  projectBTNEvent(){
    this.componentShowHidden = false
    this.projectbtnClass = 'btnActive'
    this.skillbtnClass = ''
  }
  skillBtnEvent(){
    this.componentShowHidden = true
    this.skillbtnClass = 'btnActive'
    this.projectbtnClass = ''
  }

  text1:string = ''
  text2:string = ''
  

  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.text1 = 'Projects'
        this.text2 = 'Skills'
      } else if(document.querySelector("body")?.className.includes("geo-lang")){  
        this.text1 = 'პროექტები'
        this.text2 = 'უნარები'
      }
    }, 1);
  }
  
  ngOnInit(){
    this.languageSistem()
  }
  
}
