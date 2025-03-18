import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

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
  
  constructor(private api: ApisService){this.languageSistem()}

  text1:string = ''
  text2:string = ''
  

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;
          
          this.text1 = languageArray.projectBTN
          this.text2 = languageArray.skillBTN
      })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;
          
          this.text1 = languageArray.projectBTN
          this.text2 = languageArray.skillBTN
        })
      }
    }, 1);
  }
  
  
  
  
}
