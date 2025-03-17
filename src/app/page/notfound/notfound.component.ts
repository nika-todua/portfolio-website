import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApisService } from '../../apis.service';

@Component({
  selector: 'app-notfound',
  standalone: false,
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  imgSrc:string = '/assets/illustration/404-error.svg'

  text1 = 'Page Not Found';
  text2 = 'Sorry, the page you are looking for does not exist.'
  text3 = 'Go home page'

  constructor(private titleService: Title, private metaTagService: Meta, private api:ApisService){this.languageSistem()}

  // seo texts
  description:string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular."
  seokeiwords:string = "angular developer, frontend developer, forntent, nika, todua, Nika Todua, Nick Todua, portfolio, web dev, programmer, Website Developer, web app dev, Angular Dev, developer, nika's portfolio, Nikoloz Todua, senior developer, developer senior portfolio, developer portfolio, დეველოპერის პორტფოლიო საიტი, portfolio website, World Wide Web, პროგრამისტი, საიტის დამზადება, საიტის დეველოპერი, პროგრამირება, Web development, Portfolio"
  seoimg:string = "";
  seolink:string = document.location.href;

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => { let count = 0;count=0;var set=setInterval(()=>{count++;if(count>=4){this.clickback();return clearInterval(set)} },1000); })

    this.titleService.setTitle("404 Error Page Not Found | Portfolio");
    this.metaTagService.addTags([
      {name: 'description', content: this.description},
      {name: 'keywords', content: this.seokeiwords},
      {name: 'author', content: 'Nika Todua'},
      {name: 'image', content: this.seoimg},
      {name: 'og:title', content: '404 Error Page Not Found | Portfolio'},
      {name: 'og:description', content: this.description },
      {name: 'og:url', content: this.seolink},
      {name: 'og:type', content: 'website'},
      {name: 'og:image', content: this.seoimg},
      {name: 'og:image:alt', content: 'Nika Todua'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@nika_todua2'},
      {name: 'twitter:creator', content: '@nika_todua2'},
      {name: 'twitter:description', content: this.description},
      {name: 'twitter:url', content: this.seolink},
      {name: 'twitter:image', content: this.seoimg},
      {name: 'robots', content: 'follow, nofollow'},
      {name: 'googlebot', content: 'follow, nofollow'},
      {name: 'googlebot-news', content: 'follow, nofollow'}
    ]);

  }

  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.text1 = languageArray.error;
          this.text2 = languageArray.errormessage
          this.text3 = languageArray.backhomeBTN
      })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;

          this.text1 = languageArray.error;
          this.text2 = languageArray.errormessage
          this.text3 = languageArray.backhomeBTN

        })
      }
    }, 1);
  }

  clickback(): void {
    const url = new URL(window.location.href);
    const baseURL = `${url.origin}/`; // იღებს მხოლოდ დომენის დასაწყისს
    
    if ( window.location.href.includes(`${baseURL}links/`)) {  
      window.location.href = `${baseURL}links/`;
    } else {
      window.location.href = baseURL; 
    }
  }

  backpage(){
    window.location.href = "/";
  }

}
