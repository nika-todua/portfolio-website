import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  darkmodeicon:boolean = false
  darkmodeCount:number = 0

  // localStorage-ს სახელი
  storage1name:string = "website-setting";

  // შავი და თეთრი თემის სახელები
  darktoken:string = "Dark";
  lighttoken:string = "Light";
  
  // ენის სახელები 
  usetoken:string = 'English';
  geotoken:string = 'Georgia';

  // LocalStorage-ს ობიექტი რომელიც ინაცება ტეხატის სახით, ამით ხდება ენის და თემის შეცვლა
  localstorageArray:any = {
    theme: `${this.darktoken}`,
    language: `${this.usetoken}`
  }
  
  // თეთრი და შავი თების გადამთველი
  darkmodeevent(){
    localStorage.clear();
    this.darkmodeCount = (this.darkmodeCount + 1) % 2;
    if (this.darkmodeCount === 1) {
      document.body.classList.add("light_mode");
      this.darkmodeicon = true;
      this.localstorageArray.theme = this.lighttoken;
    } else {
      document.body.classList.remove("light_mode");
      this.darkmodeicon = false;
      this.localstorageArray.theme = this.darktoken;
    }
    // მინაცემების შემნახველი
    localStorage.setItem(this.storage1name, JSON.stringify( this.localstorageArray ));
  }
  
  languageCount:number = 0
  flagimg:boolean = false

  // ენის ფადამთველი

  languageEvent(){
    localStorage.clear();
    this.languageCount = (this.languageCount + 1) % 2;
    if (this.languageCount === 1) {
      document.body.classList.remove("usa-lang");
      document.body.classList.add("geo-lang");
      this.localstorageArray.language = this.geotoken;
      this.flagimg = true;
    } else {
      document.body.classList.remove("geo-lang");
      document.body.classList.add("usa-lang");
      this.localstorageArray.language = this.usetoken;
      this.flagimg = false;
    }
    // მინაცემების შემნახველი
    localStorage.setItem(this.storage1name, JSON.stringify(this.localstorageArray));
    location.reload();
  }

  
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      const websettingstorage:any = localStorage.getItem(this.storage1name);

      // თუ არ არის მონაცემები და თუ მომცმარებელი შემოდის პირველად ამ if ფუნქციაში შემოდის და რაც წერია თავდაპირველად იმას მიანიჭებს
      if ( websettingstorage === null ) { localStorage.setItem(this.storage1name, JSON.stringify(this.localstorageArray) ); location.reload(); }
      
      // --თეთრი და შავი თემის შემცვლელი რომელიც რომ შედის მომხმარებელი ეგრევე ანიჭებს იმ მნიშვნელობას რაც შეცვალა-- 
      const theme = JSON.parse(websettingstorage).theme;
      if (theme === this.lighttoken) {
        document.body.classList.add("light_mode");
        this.localstorageArray.theme = this.lighttoken;
        this.darkmodeCount = 1;
        this.darkmodeicon = true;
      } else if (theme === this.darktoken) {
        document.body.classList.remove("light_mode");
        this.localstorageArray.theme = this.darktoken;
        this.darkmodeCount = 0;
        this.darkmodeicon = false;
      } else {
        document.body.classList.remove("light_mode");
        this.localstorageArray.theme = this.darktoken;
        this.darkmodeCount = 0;
        this.darkmodeicon = false;
      }
      
      // --ენის შემცვლელი, რომელიც რომ შედის მომხმარებელი ეგრევე ანიჭებს იმ მნიშვნელობას რაც შეცვალა--
      const language = JSON.parse(websettingstorage).language;
      if (language === this.usetoken) {
        this.localstorageArray.language = this.usetoken;
        document.body.classList.remove("geo-lang");
        document.body.classList.add("usa-lang");
        this.languageCount = 0;
        this.flagimg = false;
      } else if (language === this.geotoken) {
        this.localstorageArray.language = this.geotoken;
        document.body.classList.remove("usa-lang");
        document.body.classList.add("geo-lang");
        this.languageCount = 1;
        this.flagimg = true;
      } else {
        this.localstorageArray.language = this.usetoken;
        document.body.classList.remove("geo-lang");
        document.body.classList.add("usa-lang");
        this.languageCount = 0;
        this.flagimg = false;
      }
        
      // მონაცემების შემცვლელი
      localStorage.setItem(this.storage1name, JSON.stringify(this.localstorageArray) );
    });
  }

  
}
  