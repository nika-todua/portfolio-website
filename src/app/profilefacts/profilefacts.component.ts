import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-profilefacts',
  standalone: false,
  templateUrl: './profilefacts.component.html',
  styleUrl: './profilefacts.component.css'
})
export class ProfilefactsComponent {
  // text1: string = '';
  // text2: string = '';
  // text3: string = '';


  readonly skillyearyear: number = new Date().getFullYear() - 2022;//2022
  readonly projectMax: number = 20;//20
  readonly customerMax: number = 15;//15
  readonly yearMax: number = 5;//5
  

  elementArray = [
    { key: 'text1', number: 0 },
    { key: 'text2', number: 0 },
    { key: 'text3', number: 0 }
  ];

  
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
      this.elementArray[0].key = data.programmerYear;
      this.elementArray[1].key = data.completeproject;
      this.elementArray[2].key = data.satifiest;
    });
  }
  
  private startCounters(): void {
    setTimeout(() => {
      
      this.animateCount('year', () =>   this.elementArray[0].number++, this.skillyearyear, this.yearMax, 450, () => this.yearExceeded = true);
      this.animateCount('project', () => this.elementArray[1].number++, this.projectLength, this.projectMax, this.interval, () => this.projectExceeded = true);
      this.animateCount('customer', () => this.elementArray[2].number++, this.projectLength, this.customerMax, this.interval, () => this.customerExceeded = true);
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
    if (counterType === 'year') return this.elementArray[0].number;
    if (counterType === 'project') return this.elementArray[1].number;
    if (counterType === 'customer') return this.elementArray[2].number;
    return 0;
  }
}
