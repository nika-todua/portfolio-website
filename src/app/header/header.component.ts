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
   darkcount:number = 0;
   darktoken:string = "Dark";
   lighttoken:string = "Light";
   darkIcon:boolean = false
  
  
  darkmodeevent(){
    this.darkmodeCount++

    if(this.darkmodeCount === 1){
      this.darkmodeicon = true
      this.darkmodeCount = 1
      document.body.classList.add("light_mode")
      localStorage.setItem('theme', this.lighttoken)
    } else if(this.darkmodeCount === 2){
      this.darkmodeicon = false
      this.darkmodeCount = 0
      document.body.classList.remove("light_mode")
      localStorage.setItem('theme', this.darktoken) 
    }
    
  }

  languageCount:number = 0
  flagimg:boolean = false


   // language
   languagecount:number = 0;
   usetoken:string = 'USA';
   geotoken:string = 'GEO';
  
  
  languageEvent(){
    this.languageCount++
    if(this.languageCount === 1){
      this.flagimg = true
      this.languageCount = 1
      document.body.classList.remove("usa-lang")
      document.body.classList.add("geo-lang")
      localStorage.setItem("language", this.geotoken)
    } else if(this.languageCount === 2){
      this.flagimg = false
      document.body.classList.remove("geo-lang")
      document.body.classList.add("usa-lang")
      localStorage.setItem("language", this.usetoken)
      this.languageCount = 0
    }
    location.reload()
  }


  flagWidth:(number | string) = 0;
  flagHeight:(number | string) = 0;
  
  darkiconClass:string = ''
  
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      
      // dark mode 
      const storedTheme = localStorage.getItem('theme')

      if(storedTheme?.includes(this.lighttoken)){
        this.darkmodeicon = true
        this.darkmodeCount = 1
        document.body.classList.add("light_mode")
        localStorage.setItem('theme', this.lighttoken)
      } else if(storedTheme?.includes(this.darktoken)){
        this.darkmodeicon = false
        this.darkmodeCount = 0
        document.body.classList.remove("light_mode")
        localStorage.setItem('theme', this.darktoken) 
      }
      

      // language event

      const storagelanguage = localStorage.getItem("language")

      if (storagelanguage?.includes(this.usetoken)) {
        this.flagimg = false
        document.body.classList.remove("geo-lang")
        document.body.classList.add("usa-lang")
        this.languageCount = 0
        localStorage.setItem("language", this.usetoken)
      } else if (storagelanguage?.includes(this.geotoken)){
        this.languageCount = 1
        this.flagimg = true
        document.body.classList.add("geo-lang")
        document.body.classList.remove("usa-lang")
        localStorage.setItem("language", this.geotoken)
      }
      
    });
  }
  
  

}
