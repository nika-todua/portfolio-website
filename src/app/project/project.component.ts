import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  filterhidden: boolean = false;
  project: Project[] = []
  selectTexts: string[] = []
  projectfilterarray: Project[] = []
  projectarrayall:(Project[] | any) = []

  constructor(private apisService : ApisService){
    this.apisService.getproject().subscribe((data:(Project[] | any)) => {
      this.getporjects(data)
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
    const width = window.innerWidth;
  
    const scrollMap: { minWidth: number; scrollTop: number }[] = [
      { minWidth: 992, scrollTop: 685 },
      { minWidth: 768, scrollTop: 686 },
      { minWidth: 576, scrollTop: 644 },
      { minWidth: 480, scrollTop: 632 },
      { minWidth: 425, scrollTop: 610 },
      { minWidth: 370, scrollTop: 800 },
      { minWidth: 340, scrollTop: 795 },
      { minWidth: 0, scrollTop: 891 }, // fallback
    ];
  
    const matched = scrollMap.find(entry => width >= entry.minWidth);
    const scrollTop = (matched?.scrollTop || 0) - 25;
  
    window.scrollTo({
      top: scrollTop,
      left: 0,
      behavior: "smooth",
    });
  }
  
  get totalPages() {
    return Math.ceil((this.filterhidden ? this.projectfilterarray.length : this.projectarrayall.length) / this.itemsPerPage);
  }
  

  changePage(page: number) {
    (page >= 1 && page <= this.totalPages) && (this.currentPage = page, this.newmontharr = this.montharr.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage)), this.projectScroll();
  }


  timeBetweenDates(date1: string, date2: string): string {
    const parseDate = (str: string): Date => {
      const [day, month, year] = str.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
  
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
  
    const timeDifference = d2.getTime() - d1.getTime();
  
    const seconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(seconds / (60 * 60 * 24)); // Total days difference
    const months = Math.floor(days / 30.44); // 30.44 average days per month
    const years = Math.floor(days / 365.25); // Average days per year
  
    // Language detection
    const isGeoLang =
      typeof document !== "undefined" && document.body?.className.includes("geo-lang");
    const lang = isGeoLang ? "ka" : "en";
  
    const units = {
      en: {
        year: (n: number) => `${n} year${n !== 1 ? "s" : ""} ago`,
        month: (n: number) => `${n} month${n !== 1 ? "s" : ""} ago`,
        days: (n: number) => `${n} day${n !== 1 ? "s" : ""} ago`,
        today: "today",
      },
      ka: {
        year: (n: number) => `${n} წელი წინ`,
        month: (n: number) => `${n} თვე წინ`,
        days: (n: number) => `${n} დღის წინ`,
        today: "დღეს",
      },
    };
  
    const t = units[lang];

    if (years > 0) {
      return t.year(years);
    }
    if (months > 0) {
      return t.month(months);
    }
    if (days > 0) {
      return t.days(days);
    }
    return t.today;
  }
  
  

  getporjects(data:Project[]){
    data.sort((a: Project, b: Project) => b.id - a.id);
    this.projectarrayall = data
    this.sortingText()
    this.projectdates(this.projectarrayall)
  }

  projectdates(array:(Project[] | any)) {
    const pad = (num: number): string => String(num).padStart(2, '0');
    const today = new Date();
    const formattedToday = `${pad(today.getDate())}-${pad(today.getMonth() + 1)}-${today.getFullYear()}`;
    this.montharr = array.map((item:any) => this.timeBetweenDates(item.date, formattedToday));
  }

  sortingText(){
    let projectTags: string[] = [];
    this.projectarrayall.forEach((element: Project) => projectTags.push(element.tag) );
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
    const selectEl = document.querySelector<HTMLSelectElement>("#project_sort");
    selectEl?.addEventListener("change", (e) => {
      const select = e.currentTarget as HTMLSelectElement;
      this.projectfilterEvent(select.value, this.projectarrayall);
    });

  }
  
  removeDuplicates(array: Project[]):any {
    const uniqueArray = [...new Set(array)];
    return uniqueArray;
  }

  projectfilterEvent(tagname: string, allArray:Project[]) {
    this.projectfilterarray.length = 0;
    if (this.totalPages >= 1){ this.currentPage = 1; }
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
      let filtertextarray: Project[] = []
      filtertextarray.length = 0;
      filtertextarray = this.filterProject(this.projectarrayall, tagname)
      this.projectdates(filtertextarray)
      this.projectfilterarray = this.removeDuplicates(filtertextarray)
      this.filterhidden = true;
      return
    }
  }

  filterProject(array:Project[], tagname:string) {
    let result: Project[] = [];
    result.length = 0;
    array.forEach((el:Project) => {
      if (el.tag.toLowerCase() === tagname.toLowerCase()) {
        result.push(el);
      }
    })
    return result;
  }

}