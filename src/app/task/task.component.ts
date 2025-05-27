import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  activeTab: 'project' | 'skill' = 'project';
  componentShowHidden: boolean = false;

  setActiveTab(tab: 'project' | 'skill') {
    this.activeTab = tab;
    this.componentShowHidden = tab === 'skill';
  }

  get projectbtnClass(): string {
    return this.activeTab === 'project' ? 'btnActive' : '';
  }

  get skillbtnClass(): string {
    return this.activeTab === 'skill' ? 'btnActive' : '';
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
