import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  socialMediaLinks = [
    { name: 'Instagram', link: 'https://www.instagram.com/nicktoduaa/' },
    { name: 'GitHub', link: 'https://github.com/nika-todua' },
    { name: 'X-twitter', link: 'https://x.com/nika_todua2'},
    { name: 'fb', link: 'https://www.facebook.com/nika.todua09'}
  ]
  
  
  constructor(private titleService: Title, private metaTagService: Meta, private api : ApisService){
    this.languageSistem()
  }
  
  
  personDesktopImage:string = 'assets/img/profile_img_desktop.webp'
  personModileImage:string = 'assets/img/profile_img_mobile.webp'

  personname:string = ""
  personprofesion:string = ""
  downloadBTN:string = ""
  contactBtn:string = ""

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.personname = languageArray.username
          this.personprofesion = languageArray.personspecialist
          this.downloadBTN = languageArray.downlBTN
          this.contactBtn = languageArray.contactBTN
      })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;

          this.personname = languageArray.username
          this.personprofesion = languageArray.personspecialist
          this.downloadBTN = languageArray.downlBTN
          this.contactBtn = languageArray.contactBTN
        })
      }
    }, 1);
  }
  
  // seo texts
  description:string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular."
  seokeiwords:string = "angular developer, frontend developer, forntent, nika, todua, Nika Todua, Nick Todua, portfolio, web dev, programmer, Website Developer, web app dev, Angular Dev, developer, nika's portfolio, Nikoloz Todua, senior developer, developer senior portfolio, developer portfolio, დეველოპერის პორტფოლიო საიტი, portfolio website, World Wide Web, პროგრამისტი, საიტის დამზადება, საიტის დეველოპერი, პროგრამირება, Web development, Portfolio"
  seoimg:string = this.personDesktopImage;
  seolink:string = document.URL

  ngOnInit(){
    
    this.titleService.setTitle("Nika Todua | Portfolio");
    this.metaTagService.addTags([
      {name: 'description', content: this.description},
      {name: 'keywords', content: this.seokeiwords},
      {name: 'author', content: 'Nika Todua'},
      {name: 'image', content: document.baseURI + this.seoimg},
      {name: 'og:title', content: 'Nika Todua | Portfolio'},
      {name: 'og:description', content: this.description },
      {name: 'og:url', content: this.seolink},
      {name: 'og:type', content: 'website'},
      {name: 'og:image', content: document.baseURI + this.seoimg},
      {name: 'og:image:alt', content: 'Nika Todua'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@nika_todua2'},
      {name: 'twitter:creator', content: '@nika_todua2'},
      {name: 'twitter:description', content: this.description},
      {name: 'twitter:url', content: this.seolink},
      {name: 'twitter:image', content: document.baseURI + this.seoimg},
      {name: 'robots', content: 'follow, nofollow'},
      {name: 'googlebot', content: 'follow, nofollow'},
      {name: 'googlebot-news', content: 'follow, nofollow'}
    ]);
    
  }

}
