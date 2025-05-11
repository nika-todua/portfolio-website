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

  usetoken:string = 'English';
  geotoken:string = 'Georgia';

  localstorageArray:any = {
    theme: `${this.darktoken}`,
    language: `${this.usetoken}`
  }
  
  
  darkmodeevent(){
    this.darkmodeCount = (this.darkmodeCount + 1) % 2;
    switch(this.darkmodeCount){
      case 1:
        document.body.classList.add("light_mode");
        this.darkmodeicon = true;
        this.localstorageArray.theme = this.lighttoken
        break;
      default:
        document.body.classList.remove("light_mode");
        this.darkmodeicon = false;
        this.localstorageArray.theme = this.darktoken
        break;
    }
    // save information
    localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
  }
  
  languageCount:number = 0
  flagimg:boolean = false

  // language

  languageEvent(){
    this.languageCount = (this.languageCount + 1) % 2;
    switch(this.languageCount){
      case 1:
        this.localstorageArray.language = this.geotoken
        this.flagimg = true;
        document.body.classList.add("geo-lang");
        document.body.classList.remove("usa-lang");
      break;
        default:
          this.localstorageArray.language = this.usetoken
          document.body.classList.add("usa-lang");
          this.flagimg = false;
          document.body.classList.remove("geo-lang");
      break;
    }
    // save information
    localStorage.setItem('webSetting', JSON.stringify(this.localstorageArray));
    location.reload();
  }
  
  
  
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      
      const websettingstorage:any = localStorage.getItem("webSetting")

      if ( websettingstorage == null ) { localStorage.setItem('webSetting', JSON.stringify(this.localstorageArray) ); location.reload(); }

      // --dark mode-- 
      switch(JSON.parse(websettingstorage).theme){
        case this.lighttoken:
          this.localstorageArray.theme = this.lighttoken
          document.body.classList.add("light_mode")
          this.darkmodeCount = 1
          this.darkmodeicon = true
          break;
        case this.darktoken:
          this.localstorageArray.theme = this.darktoken
          document.body.classList.remove("light_mode")
          this.darkmodeCount = 0
          this.darkmodeicon = false
          break
        default:
          this.localstorageArray.theme = this.darktoken
          document.body.classList.remove("light_mode")
          this.darkmodeCount = 0
          this.darkmodeicon = false
        break;
      }
        
      // --language event--
      switch(JSON.parse(websettingstorage).language){
        case this.usetoken:
          this.localstorageArray.language = this.usetoken;
          document.body.classList.remove("geo-lang");
          document.body.classList.add("usa-lang");
          this.languageCount = 0;
          this.flagimg = false;
          break;
        case this.geotoken:
          this.localstorageArray.language = this.geotoken;
          document.body.classList.remove("usa-lang");
          document.body.classList.add("geo-lang");
          this.languageCount = 1;
          this.flagimg = true;
          break;
        default:
          this.localstorageArray.language = this.usetoken;
          document.body.classList.remove("geo-lang");
          document.body.classList.add("usa-lang");
          this.languageCount = 0;
          this.flagimg = false;
        break;
      }

      // save information
      localStorage.setItem('webSetting', JSON.stringify(this.localstorageArray) );
    });
  }
  
}
