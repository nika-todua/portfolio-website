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
    darkmode: `${this.darktoken}`,
    language: `${this.usetoken}`
  }
  
  
  darkmodeevent(){
    this.darkmodeCount = (this.darkmodeCount + 1) % 2;
    switch(this.darkmodeCount){
      case 1:
        document.body.classList.add("light_mode");
        this.darkmodeicon = true;
        this.localstorageArray.darkmode = this.lighttoken
        break;
      default:
        document.body.classList.remove("light_mode");
        this.darkmodeicon = false;
        this.localstorageArray.darkmode = this.darktoken
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
      
      // dark mode 
      const websettingstorage:any = localStorage.getItem("webSetting")
      
      if(websettingstorage?.includes(this.lighttoken)){
        this.localstorageArray.darkmode = this.lighttoken
        document.body.classList.add("light_mode")
        this.darkmodeCount = 1
        this.darkmodeicon = true
      } else if(websettingstorage?.includes(this.darktoken)){
        this.localstorageArray.darkmode = this.darktoken
        document.body.classList.remove("light_mode")
        this.darkmodeCount = 0
        this.darkmodeicon = false
      }else{
        this.localstorageArray.darkmode = this.darktoken
        document.body.classList.remove("light_mode")
        this.darkmodeCount = 0
        this.darkmodeicon = false
      }
      
      
      // language event
      if (websettingstorage?.includes(this.usetoken)) {
        this.localstorageArray.language = this.usetoken;
        document.body.classList.remove("geo-lang");
        document.body.classList.add("usa-lang");
        this.languageCount = 0;
        this.flagimg = false;
      } else if (websettingstorage?.includes(this.geotoken)) {
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

      // save information
      localStorage.setItem('webSetting', JSON.stringify(this.localstorageArray) );
    });
  }
  
}
