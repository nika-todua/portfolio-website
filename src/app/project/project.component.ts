import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  filterhidden: boolean = false;
  secontArray:object = []
  project: object[] = []
  selectTexts: string[] = []
  projectfilterarray: object[] = []
  projectarrayall:any = []

  constructor(private apisService : ApisService){
    this.apisService.getproject().subscribe(data => {
      this.projectarrayall = data;
      this.getporjects(this.projectarrayall)
    });
    this.languageSistem()
  }

  text1:string = ''
  text2:string = ''
  text3:string = ''

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.apisService.getlanguage("en").subscribe(datalang => {
            languageArray = datalang;
            
            this.text1 = languageArray.all
          this.text2 = languageArray.publish
          this.text3 = languageArray.webView
          
        })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.apisService.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;
          
          this.text1 = languageArray.all
          this.text2 = languageArray.publish
          this.text3 = languageArray.webView
        })
      }
    }, 1);
  }

  itemsPerPage:number = 6; // თითო გვერდზე ელემენტების რაოდენობა
  currentPage:number = 1;
  montharr:string[] = []
  newmontharr:string[] = []

  paginatedProjects() {
    this.newmontharr = this.montharr.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)

    const start = (this.currentPage - 1) * this.itemsPerPage;
    if(!this.filterhidden){
      return this.projectarrayall.slice(start, start + this.itemsPerPage);
    } else{
      return this.projectfilterarray.slice(start, start + this.itemsPerPage);
    }
  }

  getPaginationRange() {
    const total = this.totalPages;
    const current = this.currentPage;
    const range:any = [];
    
    // ვიღებთ ეკრანის სიგანეს
    const isMobile = window.innerWidth <= 480; // 480px-ზე ნაკლები ეკრანი (მობილური)
    // თუ 5-ზე ნაკლები გვერდია, ვაჩვენოთ ყველა
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        range.push(i);
      }
    } else {
      if (!isMobile) {
        // ვაჩვენოთ პირველი გვერდი, ცოტა გვერდი ახლოს და ბოლო (Desktop View)
        if (current > 2) range.push(1, "...");
        // ვაჩვენოთ მიმდინარე გვერდი და მისი ირგვლივ გვერდები
        for (let i = current - 1; i <= current + 1; i++) {
          if (i > 0 && i <= total) {
            range.push(i);
          }
        };
        
        // "..." და ბოლო გვერდი, თუ საჭიროა
        if (current < total - 1) range.push("...", total);
      } else {
        // მობილური ეკრანებისთვის (Mobile View)
        // ვაჩვენოთ 3 გვერდი ახლოს
        for (let i = current - 1; i <= current + 1; i++) {
          if (i > 0 && i <= total) {
            range.push(i);
          }
        }
      }
    }
    return range;
  }
  
  projectScroll(){
    let scrollTop = 0;
    switch (true) {
      case window.innerWidth > 991:
      scrollTop = 685;
      break;
      case window.innerWidth <= 991 && window.innerWidth > 767:
      scrollTop = 686;
      break;
      case window.innerWidth <= 767 && window.innerWidth > 575:
      scrollTop = 644;
      break;
      case window.innerWidth <= 575 && window.innerWidth > 479:
      scrollTop = 632;
      break;
      case window.innerWidth <= 479 && window.innerWidth > 424:
      scrollTop = 610;
      break;
      case window.innerWidth <= 424 && window.innerWidth > 369:
      scrollTop = 800;
      break;
      case window.innerWidth <= 369 && window.innerWidth > 339:
      scrollTop = 795;
      break;
      case window.innerWidth <= 339:
      scrollTop = 891;
      break;
    }

    window.scrollTo({
      top: scrollTop - 25,
      left: 0,
      behavior: "smooth",
    });
  }
  
  get totalPages() {
    if(!this.filterhidden){
      return Math.ceil(this.projectarrayall.length / this.itemsPerPage);
    }else{
      return Math.ceil(this.projectfilterarray.length / this.itemsPerPage);
    }
  }
  

  changePage(page: any) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.newmontharr = this.montharr.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
    }
    this.projectScroll()
  }


  timeBetweenDates(date1: string, date2: string):any {
    function parseDate(dateStr: string): Date {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month, day);
    }
    
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
    
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    
    if (days < 0) {
      months--;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (document.querySelector("body")?.className.includes('usa-lang')){
      if (years === 0 && months === 0 && days === 0){
        return 'today';
      }

      if(years === 0 && months === 0){
        return `${days} day ago`;
      } else if(years === 0 && months !== 0){
        return `${months} month ago`;
      } else if(years !== 0){
        return `${years} year ago`;
      }

    } else if (document.querySelector("body")?.className.includes('geo-lang')){
      if (years === 0 && months === 0 && days === 0){
        return 'დღეს';
      }
      
      if(years === 0 && months === 0){
        return `${days} დღის წინ`;
      } else if(years === 0 && months !== 0){
        return `${months} თვის წინ`;
      } else if(years !== 0){
        return `${years} წლის წინ`;
      }
      
    }

  }

  getporjects(data:any){
    data.sort((a: any, b: any) => b.id - a.id);
    this.projectarrayall = data
    this.sortingText()
    this.projectdates(this.projectarrayall)
  }

  projectdates(array:any){
    const pad = (num: number) => String(num).padStart(2, '0');
    const today = new Date();
    const date2 = `${pad(today.getDate())}-${pad(today.getUTCMonth() + 1)}-${today.getFullYear()}`; // დღე-თვე-წელი (დღეს)
    this.montharr.length = 0;
    this.montharr = array.map((element:typeof array) => { return this.timeBetweenDates(element.date, date2); });
  }

  sortingText(){
    let projectTags: any = [];
    this.projectarrayall.forEach((element: any) => projectTags.push(element.tag) );
    let uniqueArray: string[] = Array.from(new Set(projectTags));
    projectTags = uniqueArray
    const sortedWords = this.sortWordsByFirstLetter(projectTags);
    const index = uniqueArray.indexOf("othen");
    if (index > -1) {
      uniqueArray.splice(index, 1);
      uniqueArray.push("othen");
    }
    this.selectTexts = sortedWords
    this.selectfilter()
  }
  
  sortWordsByFirstLetter(wordArray:string[]) {
    return wordArray.sort((a:any, b:any) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
  }

  selectfilter() {
    const selectElement = document.querySelector<HTMLSelectElement>("#project_sort");
    if (selectElement) {
      selectElement.addEventListener("change", (event: Event) => {
        const target = event.target;
        if (target instanceof HTMLSelectElement) {
          const selectedOption = target.value;
          this.projectfilterEvent(selectedOption, this.projectarrayall)
        }
      });
    }
  }
  
  removeDuplicates(array: string[]):any {
    const uniqueArray = [...new Set(array)];
    return uniqueArray;
  }

  projectfilterEvent(tagname: string, allArray:any) {
    this.projectfilterarray.length = 0;
    if (this.totalPages >= 1){
      this.currentPage = 1;
    }
    if (tagname.toLowerCase() === "all" || tagname === "ყველა") {
      this.project.length = 0
      this.projectarrayall = allArray;
      this.projectdates(this.projectarrayall)
      let set = setInterval(() => {
        window.scrollTo(0, window.scrollY + 1);
        return clearInterval(set)
      }, 0.001);
      window.scrollTo(0, window.scrollY - 1);
      this.filterhidden = false;
      return
    } else {
      let filtertextarray: string[] = []
      filtertextarray.length = 0;
      filtertextarray = this.filterProject(this.projectarrayall, tagname)
      this.projectdates(filtertextarray)
      this.projectfilterarray = this.removeDuplicates(filtertextarray)
      this.filterhidden = true;
      return
    }
  }

  filterProject(array:any, tagname:any) {
    const result: any[] = [];
    array.forEach((element:any) => {
      if(element.tag === tagname){
        result.push(element)
      }
    });
    return result
  }
  


}
