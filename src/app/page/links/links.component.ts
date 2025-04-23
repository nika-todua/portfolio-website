import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApisService } from '../../apis.service';

@Component({
  selector: 'app-links',
  standalone: false,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {

  constructor(private titleService: Title, private metaTagService: Meta, private api : ApisService){
    this.languageSistem()
  }
  
  socialLinksArray:any = [
    {
      icon: 'global-line',
      rel: 'follow',
      name: 'Portfolio',
      link: 'https://nika-todua.netlify.app/',
      boxgradient: `background:#e89c45; background: linear-gradient(to right, #15f746, #5766f5 100%) !important;`
    },
    {
      icon: 'instagram-line',
      rel: 'nofollow',
      name: 'Instagram',
      link: 'https://www.instagram.com/nicktoduaa/',
      boxgradient: `background: #f09433; background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important; background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important; filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1) !important;`
    },
    {
      icon: 'facebook-circle-line',
      rel: 'nofollow',
      name: 'Facebook',
      link: 'https://www.facebook.com/nika.todua09/',
      boxgradient: `background: #00c6ff; background: linear-gradient( to right,#00c6ff,#0072ff) !important;`
    },
    {
      icon: 'github-line',
      rel: 'nofollow',
      name: 'Github',
      link: 'https://github.com/nika-todua/',
      boxgradient: `background: #24292e; background: linear-gradient( to right,#24292e,#24292e) !important;`
    },
    {
      icon: 'twitter-x-line',
      rel: 'nofollow',
      name: 'Twitter-X',
      link: 'https://x.com/nika_todua2/',
      boxgradient: `background: #1DA1F2; background: linear-gradient( to right,#1DA1F2,#009ffc) !important;`
    }
  ]
    // {
    //   icon: 'discord-fil',
    //   rel: 'nofollow',
    //   name: 'Discord  Server',
    //   link: '',
    //   boxgradient: `background: linear-gradient(45deg, #5865F2, #404EED) !important;`
    // }

  username:string = '';
  userbio:string = '';

  desktopImg:string = 'assets/img/profile_img_desktop.webp'
  mobileImg:string = 'assets/img/profile_img_mobile.webp'
 
  // seo texts
  description:string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular."
  seokeiwords:string = "angular developer, frontend developer, forntent, nika, todua, Nika Todua, Nick Todua, portfolio, web dev, programmer, Website Developer, web app dev, Angular Dev, developer, nika's portfolio, Nikoloz Todua, senior developer, developer senior portfolio, developer portfolio, დეველოპერის პორტფოლიო საიტი, portfolio website, World Wide Web, პროგრამისტი, საიტის დამზადება, საიტის დეველოპერი, პროგრამირება, Web development, Portfolio"
  seoimg:string = this.desktopImg;
  seolink:string = document.URL


  languageSistem(){
    let languageArray:any = []
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.api.getlanguage("en").subscribe(datalang => {
          languageArray = datalang;

          this.username = languageArray.username
          this.userbio = languageArray.linksBio
      })
      } else if(document.querySelector("body")?.className.includes("geo-lang")){
        this.api.getlanguage("ka").subscribe(datalang => {
          languageArray = datalang;

          this.username = languageArray.username
          this.userbio = languageArray.linksBio
        })
      }
    }, 1);
  }
  
  

  ngOnInit(){
    
    this.titleService.setTitle("Nika Todua | Social Media Links");
    this.metaTagService.addTags([
      {name: 'description', content: this.description},
      {name: 'keywords', content: this.seokeiwords},
      {name: 'author', content: 'Nika Todua'},
      {name: 'image', content: document.baseURI + this.seoimg},
      {name: 'og:title', content: 'Nika Todua | Social Media Links'},
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
