import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
  text4 = 'Go back';

  constructor(private titleService: Title, private metaTagService: Meta){}

  // seo texts
  description:string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular."
  seokeiwords:string = "angular developer, frontend developer, forntent, nika, todua, Nika Todua, Nick Todua, portfolio, web dev, programmer, Website Developer, web app dev, Angular Dev, developer, nika's portfolio, Nikoloz Todua, senior developer, developer senior portfolio, developer portfolio, დეველოპერის პორტფოლიო საიტი, portfolio website, World Wide Web, პროგრამისტი, საიტის დამზადება, საიტის დეველოპერი, პროგრამირება, Web development, Portfolio"
  seoimg:string = "";
  seolink:string = document.location.href;

  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => { let count = 0;count=0;var set=setInterval(()=>{count++;if(count>=7){this.clickback();return clearInterval(set)} },1000); })

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
    
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.text1 = 'Page Not Found';
        this.text2 = 'Sorry, the page you are looking for does not exist.'
        this.text3 = 'Go home page'
        this.text4 = 'Go back';
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.text1 = 'გვერდი არ მოიძებნა';
        this.text2 = 'უკაცრავად, გვერდი, რომელსაც ეძებთ, არ არსებობს.'
        this.text3 = 'დაბრუნება მთავარ გვერძე'
        this.text4 = 'უკან დაბრუნება';
      }
    }, 1);
    
  }

  clickback():any{
    let link:any = document.location.href
    if ( link.includes("http://localhost:4200/links") ||  link.includes("https://nika-todua.netlify.app/links") ){
      if (link.includes("http://localhost:4200/links")) {
        let baseURL = `${link.split("/")[0]}//${link.split("/")[2]}/` + 'links/'
        return window.location.href = baseURL;
      }else{
        let baseURL = `${link.split("/")[0]}//${link.split("/")[2]}/` + 'links/'
        return window.location.href = baseURL;
      }
    }else if( link.includes("http://localhost:4200/") ||  link.includes("https://nika-todua.netlify.app/") ){
      if (link.includes("http://localhost:4200")) {
        let baseURL = `${link.split("/")[0]}//${link.split("/")[2]}/`
        return window.location.href = baseURL;
      }else{
        let baseURL = `${link.split("/")[0]}//${link.split("/")[2]}/`
        return window.location.href = baseURL;
      }
    }
  }
  
  

  

}
