import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  standalone: false,
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  // 404 გვერდზე გამოსატანი ილუსტრაციის მისამართი
  imgSrc: string = '/assets/illustration/404-error.svg';

  // ტექსტები, რომლებიც ეკრანზე გამოჩნდება სხვადასხვა ენაზე
  text1 = 'Page Not Found';
  text2 = 'Sorry, the page you are looking for does not exist.';
  text3 = 'Go home page';

  // კონსტრუქტორი, სადაც ენა განისაზღვრება და ტიტულის/მეტა ტეგების სერვისები ინიაციირდება
  constructor(private titleService: Title, private metaTagService: Meta) {
    this.languageSistem(); // ენაზე დაყრდნობით ტექსტების დაყენება
  }

  // SEO-მდე გამოყენებული ცვლადები
  description: string = "Hi, I'm Nika Todua, I'm a web developer and I make high-quality websites. I make websites using angular.";
  seokeiwords: string = "angular developer, frontend developer, forntent, nika, todua, Nika Todua, Nick Todua, portfolio, web dev, programmer, Website Developer, web app dev, Angular Dev, developer, nika's portfolio, Nikoloz Todua, senior developer, developer senior portfolio, developer portfolio, დეველოპერის პორტფოლიო საიტი, portfolio website, World Wide Web, პროგრამისტი, საიტის დამზადება, საიტის დეველოპერი, პროგრამირება, Web development, Portfolio";
  seoimg: string = ""; // SEO სურათის ბმული, შეიძლება დაემატოს imgSrc
  seolink: string = document.location.href; // მიმდინარე გვერდის ბმული SEO-სთვის

  ngOnInit() {
    // ვუსმენთ დოკუმენტის ჩატვირთვას და ვიწყებთ ტაიმერის ათვლას გადამისამართებისთვის
    document.addEventListener("DOMContentLoaded", () => {
      let count = 0;
      const set = setInterval(() => {
        count++;
        if (count >= 4) { // 4 წამში გადამისამართება მთავარ ან /links/ გვერდზე
          this.clickback();
          return clearInterval(set);
        }
      }, 1000);
    });

    // SEO ტეგების დაყენება — Page Title, Open Graph, Twitter Card, და სხვა
    this.titleService.setTitle("404 Error Page Not Found | Portfolio");
    this.metaTagService.addTags([
      { name: 'description', content: this.description },
      { name: 'keywords', content: this.seokeiwords },
      { name: 'author', content: 'Nika Todua' },
      { name: 'image', content: this.seoimg },
      { name: 'og:title', content: '404 Error Page Not Found | Portfolio' },
      { name: 'og:description', content: this.description },
      { name: 'og:url', content: this.seolink },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: this.seoimg },
      { name: 'og:image:alt', content: 'Nika Todua' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nika_todua2' },
      { name: 'twitter:creator', content: '@nika_todua2' },
      { name: 'twitter:description', content: this.description },
      { name: 'twitter:url', content: this.seolink },
      { name: 'twitter:image', content: this.seoimg },
      { name: 'robots', content: 'follow, nofollow' },
      { name: 'googlebot', content: 'follow, nofollow' },
      { name: 'googlebot-news', content: 'follow, nofollow' }
    ]);
  }

  // ენის მიხედვით ტექსტების ცვლილება ქართულსა და ინგლისურს შორის
  languageSistem() {
    setTimeout(() => {
      const bodyClass = document.querySelector("body")?.className || '';
      if (bodyClass.includes('usa-lang')) {
        // ინგლისური ტექსტები
        this.text1 = 'Page Not Found';
        this.text2 = 'Sorry, the page you are looking for does not exist.';
        this.text3 = 'Go home page';
      } else if (bodyClass.includes("geo-lang")) {
        // ქართული ტექსტები
        this.text1 = 'გვერდი არ მოიძებნა';
        this.text2 = 'უკაცრავად, გვერდი, რომელსაც ეძებთ, არ არსებობს.';
        this.text3 = 'დაბრუნება მთავარ გვერდზე';
      }
    }, 1); // ვაყოვნებთ 1 მილიწამით DOM-ის სწორად წამოსაკითხად
  }

  // გადამისამართების ფუნქცია 404-ის შემდეგ — განსაზღვრავს რომელი ბმული უნდა გახსნას
  clickback(): void {
    const url = new URL(window.location.href);

    // თუ URL შეიცავს /links/, აბრუნებს იმავე ბმულზე
    if (url.href.includes(`${url.origin}/links/`)) {
      return window.location.replace(`${url.origin}/links/`);
    }
    // წინააღმდეგ შემთხვევაში — მთავარ გვერდზე აბრუნებს
    else if (url.href.includes(`${url.origin}/`)) {
      return window.location.replace(`${url.origin}/`);
    }
  }

}
