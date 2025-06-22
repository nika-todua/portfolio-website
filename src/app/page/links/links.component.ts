import { Component } from '@angular/core';
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-links',
  standalone: false,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {

  // constructor-ში ხდება ენის სისტემის ფუნქციის გამოძახება (პირველივე მომენტში როცა კომპონენტი ინიციალიზდება)
  constructor(private titleService: Title, private metaTagService: Meta) {
    this.languageSistem(); // აყენებს მომხმარებლის სახელს და ბიოგრაფიას ენის მიხედვით
  }
  
  // სოციალური ბმულების მასივი — შეიცავს ლინკებს, იკონებს და ფონურ გრადიენტებს თითოეული პლატფორმისთვის
  socialLinksArray = [
    {
      icon: 'global-line',               // აიქონი (UI-ისთვის)
      rel: 'follow',                     // SEO-სთვის ლინკის ტიპი
      name: 'Portfolio',                 // ბმულის სახელი
      link: 'https://nika-todua.netlify.app/', // ბმულის URL
      boxgradient: `background:#e89c45; background: linear-gradient(to right, #15f746, #5766f5 100%) !important;`
    },
    {
      icon: 'youtube',
      rel: 'nofollow',
      name: 'Youtube',
      link: 'https://www.youtube.com/@nika_todua',
      boxgradient: `background: #e52d27; background: linear-gradient( to right, #e52d27,#b31217 ) !important;`
    },
    {
      icon: 'instagram-line',
      rel: 'nofollow',
      name: 'Instagram',
      link: 'https://www.instagram.com/nicktoduaa/',
      boxgradient: `background: #833ab4; background: linear-gradient( to right, #833ab4,#fd1d1d,#fcb045 ) !important;`
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
  ];
  
  // მომხმარებლის სახელი და ბიო — იცვლება ენის მიხედვით
  username: string = '';
  userbio: string = '';
  
  // სურათების გზები სხვადასხვა მოწყობილობისთვის
  desktopImg: string = '/assets/img/profile_img_desktop.webp';
  mobileImg: string = '/assets/img/profile_img_mobile.webp';
  
  // ენის დამუშავების ფუნქცია — ცვლის სახელებს და ბიოგრაფიას
  languageSistem() {
    setTimeout(() => {
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.username = 'Nika Todua';
        this.userbio = 'If not us, then who?'; // ინგლისურად
      } else if (document.querySelector("body")?.className.includes("geo-lang")) {
        this.username = 'ნიკა თოდუა';
        this.userbio = 'თუ არა ჩვენ, მაშინ ვინ?'; // ქართულად
      }
    }, 1); // დაგვიანება, რათა body class-ი იყოს ჩატვირთული
  }
  
  // SEO-ისთვის აუცილებელი ტექსტები
  description: string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular.";
  seokeiwords: string = "angular developer, frontend developer, ... პროგრამირება, Web development, Portfolio";
  seoimg: string = this.desktopImg;
  seolink: string = document.URL;
  
  // კომპონენტის ჩატვირთვისას ინიშნება გვერდის სათაური და ემატება მეტა თეგები SEO-სთვის

  
  Xposition:number = 60
  textStartpositionstyle:string =`opacity: 0; animation: showanim 12ms 300ms ease forwards; -o-animation: showanim 12ms 300ms ease forwards; -moz-animation: showanim 12ms 300ms ease forwards; -webkit-animation: showanim 12ms 300ms ease forwards; transform: translate(${this.Xposition}px, 0px); -o-transform: translate(${this.Xposition}px, 0px); -ms-transform: translate(${this.Xposition}px, 0px); -moz-transform: translate(${this.Xposition}px, 0px); -webkit-transform: translate(${this.Xposition}px, 0px);`
  
  textanimation(textID:string){
    if (!textID) return;
    let duration:number = 0.25
    let animdelay:number = 0.7
    
    const text:any = document.getElementById(textID);
    
    gsap.registerPlugin(SplitText);

    if (!text) return;

    // Avoid re-splitting if already split
    if ((text as any)._isSplit) return;
    (text as any)._isSplit = true;

    const split = SplitText.create(text,  { type: "chars, lines", tag: "p" });

    gsap.fromTo(
      split.chars,
      {
        x: 0,
        opacity: 0,
        delay: animdelay,
        duration: duration,
        stagger: 0.05,
        ease: "sine.out"
      },
      {
        x: -this.Xposition,
        opacity: 1,
        delay: animdelay,
        duration: duration,
        stagger: 0.05
      }
    );

    function removeDuplicateCSS(text:any) {
      const declarations = text.split(";").map((decl:any) => decl.trim()).filter(Boolean);
      const seen = new Map();

      for (let decl of declarations) {
        const [prop, ...valueParts] = decl.split(":");
        const property = prop.trim();
        const value = valueParts.join(":").trim();
        seen.set(property, value);
      }
    
      return Array.from(seen.entries())
        .map(([prop, value]) => `${prop}: ${value}`)
        .join("; ") + ";";
    }

    setTimeout(() => {
      for (const element of split.chars) {
        let elementstyle = element.getAttribute('style') + ' ' + 'transform: translate3d(0px, 0px, 0px) !important; -o-transform: translate(0px, 0px) translate3d(0px, 0px, 0px) !important; -ms-transform: translate(0px, 0px) translate3d(0px, 0px, 0px) !important; -moz-transform: translate(0px, 0px) translate3d(0px, 0px, 0px) !important; -webkit-transform: translate(0px, 0px) translate3d(0px, 0px, 0px) !important;'
        element.setAttribute("style", removeDuplicateCSS(elementstyle))
      }
      text.classList.add("textstartposition");
      (text as any)._isSplit = false;

      if(text.classList.contains('textstartposition')){
       text.innerHTML = text.textContent || '';
      }
    }, 1800);
  }
  
  
  ngOnInit() {
    
    window.onload = ()=>{
      setTimeout(() => {
        this.textanimation('personname')
        this.textanimation('profesion')

        for(let i in this.socialLinksArray){
          this.textanimation(`socialmedialinktext_${i}`)
        }
      }, 2);
    }
    
    
    this.titleService.setTitle("Nika Todua | Social Media Links"); // გვერდის ტაიტლი
  
    // SEO-სთვის საჭირო <meta> თეგები
    this.metaTagService.addTags([
      { name: 'description', content: this.description },
      { name: 'keywords', content: this.seokeiwords },
      { name: 'author', content: 'Nika Todua' },
      { name: 'image', content: document.baseURI + this.seoimg },
      { name: 'og:title', content: 'Nika Todua | Social Media Links' },
      { name: 'og:description', content: this.description },
      { name: 'og:url', content: this.seolink },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: document.baseURI + this.seoimg },
      { name: 'og:image:alt', content: 'Nika Todua' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nika_todua2' },
      { name: 'twitter:creator', content: '@nika_todua2' },
      { name: 'twitter:description', content: this.description },
      { name: 'twitter:url', content: this.seolink },
      { name: 'twitter:image', content: document.baseURI + this.seoimg },
      { name: 'robots', content: 'follow, nofollow' },
      { name: 'googlebot', content: 'follow, nofollow' },
      { name: 'googlebot-news', content: 'follow, nofollow' }
    ]);
  }

}
