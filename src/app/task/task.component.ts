import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() messageArray: any  = [];
  
  projectArray = []

  // აქტიური ჩანართის განსაზღვრა: საწყისი მნიშვნელობა არის 'project'
  activeTab: 'project' | 'skill' = 'project';
  
  // განსაზღვრავს უნდა გამოჩნდეს თუ არა skill კომპონენტი (true/false)
  componentShowHidden: boolean = false;
  
  // ფუნქცია, რომელიც გადართავს activeTab-ს და skill კომპონენტის ხილვადობას
  setActiveTab(tab: 'project' | 'skill') {
    this.activeTab = tab;
    this.componentShowHidden = tab === 'skill'; // თუ skill არის არჩეული, ჩართავს კომპონენტის ხილვადობას
  }
  
  // getter ფუნქცია, რომელიც აბრუნებს კლასს project ღილაკისთვის
  get projectbtnClass(): string {
    this.projectArray = this.messageArray
    return this.activeTab === 'project' ? 'btnActive' : ''; // თუ არჩეულია project, უბრუნებს კლასს
  }
  
  // getter ფუნქცია, რომელიც აბრუნებს კლასს skill ღილაკისთვის
  get skillbtnClass(): string {
    return this.activeTab === 'skill' ? 'btnActive' : ''; // თუ არჩეულია skill, უბრუნებს კლასს
  }
  
  // ტექსტები, რომლებიც ენის მიხედვით იცვლება (პროექტების და უნარების სათაურები)
  text1: string = '';
  text2: string = '';
  
  // ენის სისტემის ფუნქცია — ამოწმებს body კლასს და აყენებს სათაურებს შესაბამის ენაზე
  languageSistem() {
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.text1 = 'Projects';  // ინგლისურად
        this.text2 = 'Skills';
      } else if (document.querySelector("body")?.className.includes("geo-lang")) {
        this.text1 = 'პროექტები'; // ქართულად
        this.text2 = 'უნარები';
      }
    }, 1); // მცირედი დაგვიანება, რათა დარწმუნდეს რომ body class უკვე არსებობს
  }
  
  // კომპონენტის ჩატვირთვისას გამოძახებულია ენის დაყენება
  ngOnInit() {
    this.languageSistem();


    document.addEventListener("DOMContentLoaded", () => {

      let set = setInterval(() => {
        this.projectArray = this.messageArray

        if (this.messageArray.length > 0) {
          return clearInterval(set)
        }
      }, 1);
      
    });
    
    
  }

  
}
