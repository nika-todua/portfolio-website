import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-profilefacts',
  standalone: false,
  templateUrl: './profilefacts.component.html',
  styleUrl: './profilefacts.component.css'
})
export class ProfilefactsComponent {
  text1: string = '';
  text2: string = '';
  text3: string = '';
  
  readonly skillyearyear: number = new Date().getFullYear() - 2022;
  readonly projectMax: number = 20;//20
  readonly customerMax: number = 15;//15
  readonly yearMax: number = 5;//5
  
  yearCount: number = 0;
  projectCount: number = 0;
  customerCount: number = 0;
  
  interval: number = 450;
  projectLength: number = 0;
  
  yearExceeded: boolean = false;
  projectExceeded: boolean = false;
  customerExceeded: boolean = false;
  
  constructor(private api: ApisService) {
    this.initializeData();
  }
  
  private initializeData(): void {
    this.api.getproject().subscribe((data:any) => {
      this.projectLength = data.length;
      this.interval = this.getIntervalByLength(this.projectLength);
      this.startCounters();
    });
  
    setTimeout(() => this.loadLanguage(), 1);
  }
  
  private getIntervalByLength(length: number): number {
    if (length > 34) return 100;
    if (length > 29) return 200;
    if (length > 24) return 250;
    if (length > 19) return 300;
    if (length > 14) return 350;
    if (length > 9)  return 380;
    return this.interval;
  }
  
  private loadLanguage(): void {
    const bodyClass = document.querySelector('body')?.className;
    const lang = bodyClass?.includes('usa-lang') ? 'en' :
                 bodyClass?.includes('geo-lang') ? 'ka' : null;
  
    if (!lang) return;
  
    this.api.getlanguage(lang).subscribe((data:any) => {
      this.text1 = data.programmerYear;
      this.text2 = data.completeproject;
      this.text3 = data.satifiest;
    });
  }
  
  private startCounters(): void {
    setTimeout(() => {
      
      this.animateCount('year', () => this.yearCount++, this.skillyearyear, this.yearMax, 450, () => this.yearExceeded = true);
      this.animateCount('project', () => this.projectCount++, this.projectLength, this.projectMax, this.interval, () => this.projectExceeded = true);
      this.animateCount('customer', () => this.customerCount++, this.projectLength, this.customerMax, this.interval, () => this.customerExceeded = true);
    }, 1300);
  }
  
  private animateCount(
    counterType: 'year' | 'project' | 'customer',
    incrementFn: () => void,
    target: number,
    max: number,
    delay: number,
    onExceed: () => void
  ): void {
    const intervalId = setInterval(() => {
      incrementFn();
      const currentValue = this.getCurrentValue(counterType);
  
      if (currentValue >= target || currentValue >= max) {
        clearInterval(intervalId);
        if (currentValue >= max) onExceed();
      }
    }, delay);
  }
  private getCurrentValue(counterType: 'year' | 'project' | 'customer'): number {
    if (counterType === 'year') return this.yearCount;
    if (counterType === 'project') return this.projectCount;
    if (counterType === 'customer') return this.customerCount;
    return 0;
  }
  
}
