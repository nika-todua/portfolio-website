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

    if (this.darkmodeCount === 1) {
      document.body.classList.add("light_mode");
      this.darkmodeicon = true;
      this.localstorageArray.darkmode = this.lighttoken
      localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
    } else {
      document.body.classList.remove("light_mode");
      this.darkmodeicon = false;
      this.localstorageArray.darkmode = this.darktoken
      localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
    }
  }
  
  languageCount:number = 0
  flagimg:boolean = false

  // language
  

  languageEvent(){
    this.languageCount = (this.languageCount + 1) % 2;

    if (this.languageCount === 1) {
      this.localstorageArray.language = this.geotoken
      this.flagimg = true;
      document.body.classList.add("geo-lang");
      document.body.classList.remove("usa-lang");
    } else {
      this.localstorageArray.language = this.usetoken
      this.flagimg = false;
      document.body.classList.add("usa-lang");
      document.body.classList.remove("geo-lang");
    }
    localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
    
    location.reload();
  }
  
  
  
  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      
      // dark mode 
      const websettingstorage:any = localStorage.getItem("webSetting")
      
      localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
      
      if(JSON.parse(websettingstorage).darkmode?.includes(this.lighttoken)){
        // localStorage.setItem('theme', this.lighttoken)
        this.localstorageArray.darkmode = this.lighttoken
        document.body.classList.add("light_mode")
        this.darkmodeCount = 1
        this.darkmodeicon = true
        localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
      } else if(JSON.parse(websettingstorage).darkmode?.includes(this.darktoken)){
        this.localstorageArray.darkmode = this.darktoken
        // localStorage.setItem('theme', this.darktoken) 
        document.body.classList.remove("light_mode")
        this.darkmodeCount = 0
        this.darkmodeicon = false
        localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
      }else{
        this.localstorageArray.darkmode = this.darktoken
        // localStorage.setItem('theme', this.darktoken) 
        document.body.classList.remove("light_mode")
        this.darkmodeCount = 0
        this.darkmodeicon = false
        localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
      }
      
      
      // language event

      switch (JSON.parse(websettingstorage).language) {
        case this.usetoken:
          document.body.classList.add("usa-lang");
          document.body.classList.remove("geo-lang");
          // localStorage.setItem("language", this.usetoken);
          this.localstorageArray.language = this.usetoken
          this.languageCount = 0;
          this.flagimg = false;
          localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
          break;
        case this.geotoken:
          document.body.classList.add("geo-lang");
          document.body.classList.remove("usa-lang");
          // localStorage.setItem("language", this.geotoken);
          this.localstorageArray.language = this.geotoken
          this.languageCount = 1;
          localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
          this.flagimg = true;
          break;
        default:
          document.body.classList.add("usa-lang");
          document.body.classList.remove("geo-lang");
          this.localstorageArray.language = this.usetoken
          // localStorage.setItem("language", this.usetoken);
          this.languageCount = 0;
          localStorage.setItem('webSetting', JSON.stringify( this.localstorageArray ));
          this.flagimg = false;
          break;
        }
        
        console.log( JSON.stringify( this.localstorageArray ) );
        
      
    });
  }
  
  

}
