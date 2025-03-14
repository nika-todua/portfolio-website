import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-profilefacts',
  standalone: false,
  templateUrl: './profilefacts.component.html',
  styleUrl: './profilefacts.component.css'
})
export class ProfilefactsComponent {

  text1:string = ''
  text2:string = ''
  text3:string = ''

  skillyearyear:number = new Date().getFullYear() - 2022;
  projectmaxlength:number = 20
  customersmaxlength:number = 15
  yearmaxnumber:number = 5

  yearnum:number = 0
  projectslengthnum:number = 0
  customerintlength:number = 0
  
  interval:number = 450
  projectLength:number = 0;

  constructor(private api:ApisService){this.apitomy()}

  yearPlus:boolean = false
  projectslengthnumPlus:boolean = false
  customerintlengthPlus:boolean = false
  
  apitomy(){
    let languageArray:any = []
    let arr:any = []

    this.api.getproject().subscribe(data => {
      arr = data
      this.projectLength = arr.length
      this.interval =  this.projectLength > 34 ? 100  : this.projectLength > 29 ? 200 : this.projectLength > 24 ? 250 :
                       this.projectLength > 19 ? 300 : this.projectLength > 14 ? 350 : this.projectLength > 9  ? 380 : this.interval;
      this.startEvent()
    });
    
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.text1 = languageArray.programmerYear
          this.text2 = languageArray.completeproject
          this.text3 = languageArray.satifiest
      })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;
          this.text1 = languageArray.programmerYear
          this.text2 = languageArray.completeproject
          this.text3 = languageArray.satifiest
        })
      }
    }, 1);
  }
  
  
  startEvent(){
    // year
    let yearint = setInterval(() => {
      this.yearnum++
      if(this.yearnum === this.skillyearyear){ clearInterval(yearint) }
      if(this.yearnum > this.yearmaxnumber){
        this.yearPlus = true
        this.yearnum = this.yearnum
        return clearInterval(yearint)
      }
    }, 450);

    
    // Completed projects
    let projectint = setInterval(() => {
      this.projectslengthnum++
      if(this.projectslengthnum === this.projectLength){ clearInterval(projectint) }
      if(this.projectslengthnum >= this.projectmaxlength){
        this.projectslengthnumPlus = true
        this.projectslengthnum = this.projectslengthnum
        return clearInterval(projectint)
      };
    }, this.interval);

    
    // Satisfied customers
    let customerint = setInterval(() => {
      this.customerintlength++
      if(this.customerintlength === this.projectLength){ clearInterval(customerint) }
      if(this.customerintlength >= this.customersmaxlength){
        this.customerintlengthPlus = true
        this.customerintlength = this.customerintlength
        return clearInterval(customerint)
      }
    }, this.interval);
    
  }
}
