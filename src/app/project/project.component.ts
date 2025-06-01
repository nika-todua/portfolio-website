import { Component } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  project: Project[] = [];
  selectTexts: string[] = [];
  projectfilterarray: Project[] = [];
  projectarrayall: Project[] = [];

  text1: string = '';
  text2: string = '';

  constructor(private apisService: ApisService) {
    this.apisService.getproject().subscribe((data:any) => {
      this.getprojects(data);
    });
    this.languageSystem();
  }

  // მეტენესის პროქტების და ფერების ტექსტის სისტემის ფუნქცია
  languageSystem() {
    setTimeout(() => {
      const bodyClass = document.querySelector('body')?.className || '';
      if (bodyClass.includes('usa-lang')) {
        this.text1 = 'All';
        this.text2 = 'View website';
      } else if (bodyClass.includes('geo-lang')) {
        this.text1 = 'ყველა';
        this.text2 = 'საიტის ნახვა';
      }
    }, 1);
  }

  itemsPerPage: number = 6; // გვერდზე еლემენტების რაოდენობა
  currentPage: number = 1;
  montharr: string[] = [];
  newmontharr: string[] = [];

  // ამოჭრის მიმდინარე გვერდისთვის შესაბამისი პროექტების მასივს
  paginatedProjects(): Project[] {
    // სრული და ფილტრული მასივების ამოსაჩნები ინდექსები
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pageAll = this.projectarrayall.slice(start, start + this.itemsPerPage);
    const pageFiltered = this.projectfilterarray.slice(start, start + this.itemsPerPage);

    // გაარჩევს, რომელი მასივი უნდა დაბრუნდეს
    return !this.filterhidden ? pageAll : pageFiltered;
  }

  // ჯამlobal გვერდების რაოდენობის გამოთვლა
  get totalPages(): number {
    const length = this.filterhidden ? this.projectfilterarray.length : this.projectarrayall.length;
    return Math.ceil(length / this.itemsPerPage);
  }

  // გვერდის შეცვლა და გვერდის გადახვევა
  changePage(page: any) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.newmontharr = this.montharr.slice(
        (page - 1) * this.itemsPerPage,
        page * this.itemsPerPage
      );
      this.projectScroll();
    }
  }

  // გვერდების ნავიგაციის დიაპაზონი
  getPaginationRange(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const range: (number | string)[] = [];
    const isMobile = window.innerWidth <= 480;

    if (total <= 5) {
      // თუ სულ <=5 გვერდია, აჩვენე ყველა
      for (let i = 1; i <= total; i++) {
        range.push(i);
      }
    } else if (!isMobile) {
      // დესკტოპზე
      if (current > 3) range.push(1, '...');
      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);
      for (let i = start; i <= end; i++) range.push(i);
      if (current < total - 1) range.push('...', total);
    } else {
      // მობილურზე
      for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
        range.push(i);
      }
      if (current < total - 1) range.push('...', total);
    }
    return range;
  }

  // სწორ პოზიციაზე გვერდის ავტო-სკროლა ეკრანის ზომის მიხედვით
  projectScroll() {
    const width = window.innerWidth;
    const scrollMap = new Map<number, number>([
      [992, 685],
      [768, 686],
      [576, 644],
      [480, 632],
      [425, 610],
      [370, 800],
      [340, 795],
      [0, 891],
    ]);
    const scrollTop = Array.from(scrollMap)
      .find(([min]) => width >= min)?.[1] ?? 0;
    window.scrollTo({ top: Math.max(scrollTop - 25, 0), left: 0, behavior: 'smooth' });
  }

  // API-დან მიღებული პროექტების დამუშავება და დასორტვა
  getprojects(data: Project[]) {
    this.projectarrayall = data.sort((a, b) => b.id - a.id);
    this.sortingText();
  }

  // ტეგების ელემენტების ხილვადობისა და სორტირების ფუნქციები
  sortingText() {
    const tags = Array.from(new Set(this.projectarrayall.map(p => p.tag)));
    const sorted = this.sortWordsByFirstLetter(tags);
    const idx = sorted.indexOf('othen');
    if (idx > -1) {
      sorted.splice(idx, 1);
      sorted.push('othen');
    }
    this.selectTexts = sorted;
    this.initFilterSelect();
  }

  // ტეგების ელემენტების ალფაბეტური სორტირება
  sortWordsByFirstLetter(arr: string[]): string[] {
    return arr.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
  }

  // <select> ელემენტის onchange ღონისძიების დაყენება
  initFilterSelect() {
    const selectEl = document.querySelector<HTMLSelectElement>('#project_sort');
    if (selectEl) {
      selectEl.onchange = (e) => {
        const tag = (e.target as HTMLSelectElement).value;
        this.applyFilter(tag);
      };
    }
  }

  // დუბლიკატების მოცილება
  removeDuplicates(arr: Project[]): Project[] {
    return Array.from(new Set(arr));
  }

  // პროექტების ფილტრაცია ტეგის მიხედვით და currentPage-ის გადაყენება
  applyFilter(tag: string) {
    this.projectfilterarray = [];
    this.currentPage = 1;
    if (['all', 'ყველა'].includes(tag.toLowerCase())) {
      this.filterhidden = false;
    } else {
      const filtered = this.filterProject(this.projectarrayall, tag);
      this.projectfilterarray = this.removeDuplicates(filtered);
      this.filterhidden = true;
    }
    window.scrollTo({ top: window.scrollY - 1, behavior: 'smooth' });
    window.scrollTo({ top: window.scrollY + 1, behavior: 'smooth' });
  }

  // პროექტების ელემენტების ფილტრაცია ტეგის მიხედვით
  filterProject(arr: Project[], tag: string): Project[] {
    return arr.filter(p => p.tag.toLowerCase().includes(tag.toLowerCase()));
  }

  // GSAP ანიმაციების ინიციალიზაცია დოკუმენტის ლოდზე
  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    let isAnimating = false;
  
    async function animateSequentially(projects: Project[]) {
      if (isAnimating) return;
      isAnimating = true;
      for (const proj of projects) {
        const box = document.querySelector(`.project_${proj.id}`) as HTMLElement | null;

        if (box && ScrollTrigger.isInViewport(box)) {
          const delay = Math.random() * 2 + 1;
          await new Promise(r => setTimeout(r, delay * 185));
          let tween = gsap.to(box, { opacity: 1, y: 0, pointerEvents:"auto", duration: 0.2 });
          tween.play()
        }
        // აქელემენტს ემატება კლასი animated-in
        if (box && box!.getAttributeNode('style') != null) {
          if ( box!.getAttributeNode('style')!.value.includes("transform: translate(0px, 0px);") || box!.getAttributeNode('style')!.value.includes("transform: translate3d(0px, 0px, 0px);") && box!.getAttributeNode('style')!.value.includes("opacity: 1;")) {
            box.classList.add("animated-in")
          }
        }
      }
      isAnimating = false;
    }
  
    let scrollTimeout: number | null = null;
    document.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        animateSequentially(this.paginatedProjects());
      }, 3);
    });
  }

}