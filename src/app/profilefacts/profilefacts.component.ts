import { Component } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-profilefacts',
  standalone: false,
  templateUrl: './profilefacts.component.html',
  styleUrl: './profilefacts.component.css'
})
export class ProfilefactsComponent {

  readonly skillyearyear: number = new Date().getFullYear() - 2022;//2022
  readonly yearMax: number = 5;//5
  readonly projectMax: number = 20;//20
  readonly customerMax: number = 15;//15

  elementArray = [
    { key: '', number: 0, pluseSet: false },
    { key: '', number: 0, pluseSet: false },
    { key: '', number: 0, pluseSet: false }
  ];

  interval: number = 450;
  projectLength: number = 0;
  
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
    const thresholds = [
      { limit: 34, value: 100 },
      { limit: 29, value: 200 },
      { limit: 24, value: 250 },
      { limit: 19, value: 300 },
      { limit: 14, value: 350 },
      { limit: 9,  value: 380 }
    ];
    for (const { limit, value } of thresholds) {
      if (length > limit) return value;
    }
    return this.interval;
  }
  
  private loadLanguage(): void {

    if (document.querySelector("body")?.className.includes('usa-lang')) {
      this.elementArray[0].key = 'Years of work experience';
      this.elementArray[1].key = 'Completed projects';
      this.elementArray[2].key = 'Satisfied customers';
    } else if(document.querySelector("body")?.className.includes("geo-lang")){
      this.elementArray[0].key = 'წლიანი გამოცდილება';
      this.elementArray[1].key = 'დასრულებული პროექტები';
      this.elementArray[2].key = 'კმაყოფილი მომხმარებლები';
    }

  }
  
  private startCounters(): void {
    setTimeout(() => {
      this.animateCount('year', () =>   this.elementArray[0].number++, this.skillyearyear, this.yearMax, 450, () => this.elementArray[0].pluseSet = true);
      this.animateCount('project', () => this.elementArray[1].number++, this.projectLength, this.projectMax, this.interval, () => this.elementArray[1].pluseSet = true);
      this.animateCount('customer', () => this.elementArray[2].number++, this.projectLength, this.customerMax, this.interval, () => this.elementArray[2].pluseSet = true);
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

      if (currentValue >= Math.min(target, max)) {
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
