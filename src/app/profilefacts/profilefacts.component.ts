import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profilefacts',
  standalone: false,
  templateUrl: './profilefacts.component.html',
  styleUrl: './profilefacts.component.css'
})
export class ProfilefactsComponent {

  @Input() message: any = 0;

  // სამუშაო გამოცდილების წლების დინამიკური გამოთვლა (2022 წლიდან დღემდე)
  readonly skillyearyear: number = new Date().getFullYear() - 2022;

  // მაქსიმალური მნიშვნელობები counters-თვის
  readonly yearMax: number = 5;
  readonly projectMax: number = 20;
  readonly customerMax: number = 15;

  // მასივი, რომელიც შეიცავს თითოეული counter-ის (წლები, პროექტები, კლიენტები) მონაცემებს
  elementArray = [
    { key: '', number: 0, pluseSet: false },
    { key: '', number: 0, pluseSet: false },
    { key: '', number: 0, pluseSet: false }
  ];

  // ანიმაციის ინტერვალის საწყისი მნიშვნელობა
  interval: number = 450;

  // პროექტების რაოდენობა, რომელიც მოგვაქვს API-დან
  projectLength: number = 0;

  ngOnInit(): void {

    let set3 = setInterval(() => {
      this.projectLength = this.message; // პროექტების რაოდენობის შენახვა
      this.interval = this.getIntervalByLength(this.projectLength); // ინტერვალის გამოთვლა პროექტების რაოდენობის მიხედვით
      if(this.projectLength > 0){
        clearInterval(set3)
      }
      
      
    }, 1);
    this.startCounters(); // ანიმაციის დაწყება
    this.initializeData();
  }
  
  // ამ მეთოდში იტვირთება პროექტების რაოდენობა API-დან და იწყება counters-ების ანიმაცია
  private initializeData(): void {      
    // ენის ჩატვირთვა პატარა დაგვიანებით, რათა მოესწროს body class-ის დაფიქსირება
    setTimeout(() => {
      this.loadLanguage()
    }, 1);
  }

  // ანიმაციის ინტერვალის განსაზღვრა პროექტების რაოდენობის მიხედვით
  private getIntervalByLength(length: number): number {
    const thresholds = [
      { limit: 19, value: 225 },
      { limit: 14, value: 350 },
      { limit: 9,  value: 380 }
    ];

    // თუ projectLength გადაჭარბებს მითითებულ ზღვარს, აბრუნებს შესაბამის ინტერვალს
    for (const { limit, value } of thresholds) {
      if (length > limit) return value;
    }

    // თუ არ გადაჭარბა არცერთ ზღვარს, დაბრუნდეს მიმდინარე ინტერვალი
    return this.interval;
  }

  // ენაზე დაყრდნობით ელემენტების ტექსტის დაყენება (USA ან GEO)
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

  // Counters-ის ანიმაციის დაწყება მცირე დაგვიანებით
  private startCounters(): void {
    setTimeout(() => {
      // თითოეულ counter-ს გაეშვება თავისი ანიმაცია შესაბამისი მნიშვნელობით
      this.animateCount('year', () => this.elementArray[0].number++, this.skillyearyear, this.yearMax, 450, () => this.elementArray[0].pluseSet = true);
      this.animateCount('project', () => this.elementArray[1].number++, this.projectLength, this.projectMax, this.interval, () => this.elementArray[1].pluseSet = true);
      this.animateCount('customer', () => this.elementArray[2].number++, this.projectLength, this.customerMax, this.interval, () => this.elementArray[2].pluseSet = true);
    }, 95);
  }

  // კონკრეტული counter-ის ანიმაცია - increment ფუნქციის განსაზღვრა და გაჩერება როცა მიაღწევს მიზანს ან მაქსიმუმს
  private animateCount(
    counterType: 'year' | 'project' | 'customer',
    incrementFn: () => void,
    target: number,
    max: number,
    delay: number,
    onExceed: () => void
  ): void {
    const intervalId = setInterval(() => {
      incrementFn(); // ზრდის counter-ს
      const currentValue = this.getCurrentValue(counterType); // იღებს მიმდინარე მნიშვნელობას

      // თუ მიღწეულია მიზანი ან მაქსიმუმი, გაჩერდეს ინტერვალი
      if (currentValue >= Math.min(target, max)) {
        clearInterval(intervalId);
        if (currentValue >= max) onExceed(); // თუ გადაჭარბდა max-ს, გაწერს + ნიშნს
      }
    }, delay);
  }

  // აბრუნებს კონკრეტული counter-ის მიმდინარე მნიშვნელობას
  private getCurrentValue(counterType: 'year' | 'project' | 'customer'): number {
    if (counterType === 'year') return this.elementArray[0].number;
    if (counterType === 'project') return this.elementArray[1].number;
    if (counterType === 'customer') return this.elementArray[2].number;
    return 0;
  }

}