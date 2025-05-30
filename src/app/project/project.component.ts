import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Project } from '../shared/project.model';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  constructor(private apisService : ApisService){
    this.apisService.getproject().subscribe((data:(Project[] | any)) => { this.getporjects(data) });
    this.languageSistem()
  }

  languageSistem(){
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.text1 = 'All'
        this.text2 = 'View website'
      } else if(document.querySelector("body")?.className.includes("geo-lang")){  
        this.text1 = 'ყველა'
        this.text2 = 'საიტის ნახვა'
      }
    }, 1);
  }

  itemsPerPage:number = 6; // თითო გვერდზე ელემენტების რაოდენობა
  currentPage:number = 1;
  montharr:string[] = []
  newmontharr:string[] = []

  paginatedProjects():any {
    this.newmontharr = this.montharr.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
    
    const start = (this.currentPage - 1) * this.itemsPerPage;
    let projectobjectarray = this.projectarrayall.slice(start, start + this.itemsPerPage) 
    let projectobjectarraySort = this.projectfilterarray.slice(start, start + this.itemsPerPage) 

    let array:Project[] = []
    array.length = 0;
    
    if(!this.filterhidden){
      array = projectobjectarray
    } else{
      array = projectobjectarraySort
    }
    return array
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
        // Desktop View: Show first page, nearby pages, and last page
        if (current > 3) range.push(1, "...");
        
        if (current >= 4) {
          range.length = 0; // Clear the range if current is less than 4
          if (current > 3) range.push(1, "...");
          for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
            range.push(i);
          }

          if (current < total - 1) range.push("...", total);
          
          if (total - 3 < current) {
            for (let i = range.length - 1; i >= 0; i--) {
              if (range[i] === '...') {
                range.pop();
              }
            }
            range.push(total);
          }
          
        }
        
        if (current < 4) {
          for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 2); i++) {
            range.push(i);
          }
          if (current < total - 1) range.push("...", total);
        }
        
      } else {
        // Mobile View: Show 3 nearby pages
        for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
          range.push(i);
        }
        
        if (current < total - 1) range.push("...", total);
        
        if(total - 2 === current){
          for (let i = range.length - 1; i >= 0; i--) {
            if (range[i] === '...') {
              range.splice(i, 1);
            }
          }
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
      top: Math.max(scrollTop - 25, 0),
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

  
  getporjects(data:Project[]){
    this.projectarrayall = data.sort((a: Project, b: Project) => b.id - a.id);
    this.sortingText();
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
      this.projectarrayall = allArray;
      this.filterhidden = false;
    } else {
      const filteredProjects = this.filterProject(this.projectarrayall, tagname);
      this.projectfilterarray = this.removeDuplicates(filteredProjects);
      this.filterhidden = true;
    }
    // Trigger a slight scroll to refresh the view
    window.scrollTo({ top: window.scrollY - 1, behavior: "smooth" });
    window.scrollTo({ top: window.scrollY + 1, behavior: "smooth" });
  }

  filterProject(array: Project[], tagname: string): Project[] {
    return array.filter(el =>
      el.tag.toLowerCase().includes(tagname.toLowerCase())
    );
  }


  ngOnInit() {
    //list as many as you'd like
    gsap.registerPlugin(ScrollTrigger);
    
    document.addEventListener("scroll", () => {
      for (let i of this.paginatedProjects()) {
        // Only act on even IDs
        const selector = `#project_${i.id}`;
        const box: HTMLElement | null = document.querySelector(selector);
        
        if (box && ScrollTrigger.isInViewport(box)) {
          const tween = gsap.to(box, {
            y: 0,
            duration: 0.5,
            opacity: 1,
            delay: 0.15, // Set delay here directly
          });
        }
      }
    });

    
  }
  
}