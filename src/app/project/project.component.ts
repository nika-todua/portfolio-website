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

  text1:string = ''
  text2:string = ''
  text3:string = ''

  constructor(private apisService : ApisService){
    this.apisService.getproject().subscribe((data:(Project[] | any)) => { this.getporjects(data) });
    this.languageSistem()
  }

  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.text1 = 'All'
        this.text2 = 'was published'
        this.text3 = 'View website'
      } else if(document.querySelector("body")?.className.includes("geo-lang")){  
        this.text1 = 'ყველა'
        this.text2 = 'გამოქვეყნდა'
        this.text3 = 'საიტის ნახვა'
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
    const range:(number | any) = [];
    
    // ვიღებთ ეკრანის სიგანეს
    const isMobile = window.innerWidth <= 480; // 480px-ზე ნაკლები ეკრანი (მობილური)
    // თუ 5-ზე ნაკლები გვერდია, ვაჩვენოთ ყველა
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        range.push(i);
      }
    } else {
      if (!isMobile) {
        // Desktop View: Show first page, nearby pages, and last page
        if (current > 2) range.push(1, "...");
        for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
          range.push(i);
        }
        if (current < total - 1) range.push("...", total);
      } else {
        // Mobile View: Show 3 nearby pages
        for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
          range.push(i);
        }
      }
    }
    return range;
  }
  
  projectScroll(){
    const width = window.innerWidth;

    const scrollMap = new Map<number, number>([
      [992, 685],
      [768, 686],
      [576, 644],
      [480, 632],
      [425, 610],
      [370, 800],
      [340, 795],
      [0, 891], // fallback
    ]);

    const scrollTop = Array.from(scrollMap.entries())
      .find(([minWidth]) => width >= minWidth)?.[1] ?? 0;

    window.scrollTo({
      top: scrollTop - 25,
      left: 0,
      behavior: "smooth",
    });
  }
  
  get totalPages() {
    return Math.ceil((this.filterhidden ? this.projectfilterarray.length : this.projectarrayall.length) / this.itemsPerPage);
  }
  

  changePage(page: number) {
    (page >= 1 && page <= this.totalPages) && (this.currentPage = page, this.newmontharr = this.montharr.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage))
    this.projectScroll();
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
    const isGeoLang = typeof document !== "undefined" && document.body?.className.includes("geo-lang");
    
    const lang = isGeoLang ? "ka" : "en";
      
    const units = {
        en: {
          year: (n: number) => `${n} year${n !== 1 ? "s" : ""} ago`,
          month: (n: number) => `${n} month${n !== 1 ? "s" : ""} ago`,
          days: (n: number) => `${n} day${n !== 1 ? "s" : ""} ago`,
        today: "today",
      },
      ka: {
        year: (n: number) => `${n} წლის წინ`,
        month: (n: number) => `${n} თვის წინ`,
        days: (n: number) => `${n} დღის წინ`,
        today: "დღეს",
      },
    };
    
    const t = units[lang];
    
    if (years > 0) {
      return t.year(years);
    } else if (months > 0) {
      return t.month(months);
    } else if (days > 0) {
      return t.days(days);
    }
    return t.today;
  }
  
  
  getporjects(data:Project[]){
    this.projectarrayall = data.sort((a: Project, b: Project) => b.id - a.id);
    this.sortingText();
    this.projectdates(this.projectarrayall);
  }

  projectdates(array:(Project[] | any)) {
    const pad = (num: number): string => String(num).padStart(2, '0');
    const today = new Date();
    const formattedToday = `${pad(today.getDate())}-${pad(today.getMonth() + 1)}-${today.getFullYear()}`;
    this.montharr = array.map((item:any) => this.timeBetweenDates(item.date, formattedToday));
  }

  sortingText(){
    const projectTags:any = Array.from(new Set(this.projectarrayall.map((element: Project) => element.tag)));
    const sortedTags = this.sortWordsByFirstLetter(projectTags);
    const otherIndex = sortedTags.indexOf("othen");
    if (otherIndex > -1) {
      sortedTags.splice(otherIndex, 1);
      sortedTags.push("othen");
    }
    this.selectTexts = sortedTags;
    this.selectfilter();
  }
  
  sortWordsByFirstLetter(wordArray:string[]) {
    return wordArray.sort((a:any, b:any) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
  }

  selectfilter() {
    const selectEl = document.querySelector<HTMLSelectElement>("#project_sort");
    if (selectEl) {
      // Remove previous event listeners to avoid duplicates
      selectEl.onchange = (e: Event) => {
        const select = e.target as HTMLSelectElement;
        if (select) {
          this.projectfilterEvent(select.value, this.projectarrayall);
        }
      };
    }
  }
  
  removeDuplicates(array: Project[]):any {
    const uniqueArray = [...new Set(array)];
    return uniqueArray;
  }

  projectfilterEvent(tagname: string, allArray:Project[]) {
    this.projectfilterarray.length = 0;
    if (this.totalPages >= 1){ this.currentPage = 1; }
    if (["all", "ყველა"].includes(tagname.toLowerCase())) {
      this.project = [];
      this.projectarrayall = allArray;
      this.projectdates(this.projectarrayall);
      this.filterhidden = false;
    } else {
      const filteredProjects = this.filterProject(this.projectarrayall, tagname);
      this.projectdates(filteredProjects);
      this.projectfilterarray = this.removeDuplicates(filteredProjects);
      this.filterhidden = true;
    }
    // Trigger a slight scroll to refresh the view
    window.scrollTo({ top: window.scrollY - 1, behavior: "smooth" });
    window.scrollTo({ top: window.scrollY + 1, behavior: "smooth" });
  }

  filterProject(array:Project[], tagname:string) {
    let result: Project[] = [];
    result.length = 0;
    for (const el of array) {
      if( el.tag.toLocaleLowerCase().includes(tagname.toLocaleLowerCase()) ){
        result.push(el)
      }
    }
    return result;
  }

}