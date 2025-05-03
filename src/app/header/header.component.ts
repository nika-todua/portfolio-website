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

   // dark mode event
   darktoken:string = "Dark";
   lighttoken:string = "Light";
  
  
  darkmodeevent(){
    this.darkmodeCount++

    switch (this.darkmodeCount) {
      case 1:
      document.body.classList.add("light_mode");
      this.darkmodeicon = true;
      this.darkmodeCount = 1;
      localStorage.setItem('theme', this.lighttoken);
      break;
      case 2:
      document.body.classList.remove("light_mode");
      this.darkmodeicon = false;
      this.darkmodeCount = 0;
      localStorage.setItem('theme', this.darktoken);
      break;
    }
    
  }

  languageCount:number = 0
  flagimg:boolean = false

  // language
  usetoken:string = 'USA';
  geotoken:string = 'GEO';
  
  
  languageEvent(){
    this.languageCount++
    if(this.languageCount === 1){
      localStorage.setItem("language", this.geotoken)
      this.flagimg = true
      this.languageCount = 1
      document.body.classList.add("geo-lang")
      document.body.classList.remove("usa-lang")
    } else if(this.languageCount === 2){
      localStorage.setItem("language", this.usetoken)
      this.flagimg = false
      this.languageCount = 0
      document.body.classList.add("usa-lang")
      document.body.classList.remove("geo-lang")
    }
    location.reload()
  }
  
  
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      
      // dark mode 
      const storedTheme = localStorage.getItem('theme')

      if(storedTheme?.includes(this.lighttoken)){
        localStorage.setItem('theme', this.lighttoken)
        document.body.classList.add("light_mode")
        this.darkmodeCount = 1
        this.darkmodeicon = true
      } else if(storedTheme?.includes(this.darktoken)){
        localStorage.setItem('theme', this.darktoken) 
        document.body.classList.remove("light_mode")
        this.darkmodeCount = 0
        this.darkmodeicon = false
      }
      

      // language event

      const storagelanguage = localStorage.getItem("language")

      switch (storagelanguage) {
        case this.usetoken:
          document.body.classList.add("usa-lang");
          document.body.classList.remove("geo-lang");
          localStorage.setItem("language", this.usetoken);
          this.languageCount = 0;
          this.flagimg = false;
          break;
        case this.geotoken:
          document.body.classList.add("geo-lang");
          document.body.classList.remove("usa-lang");
          localStorage.setItem("language", this.geotoken);
          this.languageCount = 1;
          this.flagimg = true;
          break;
        default:
          document.body.classList.add("usa-lang");
          document.body.classList.remove("geo-lang");
          localStorage.setItem("language", this.usetoken);
          this.languageCount = 0;
          this.flagimg = false;
          break;
      }
      
    });
  }
  
  

}
