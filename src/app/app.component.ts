import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myportfolio';


  constructor(private router: Router, private meta: Meta) {
    this.router.events.subscribe(() => {
      if(document.body.className.includes("usa-lang")){
        document.documentElement.lang = "en";
      }else if (document.body.className.includes("geo-lang")){
        document.documentElement.lang = "ka";
      }
      this.updateCanonicalUrl(document.URL);
    });
  }
  updateCanonicalUrl(url: string) {
    this.meta.updateTag({ name: 'canonical', content: url });
    let links = document.querySelector("link[rel='canonical']");
    if (!links) {
      links = document.createElement('link');
      links.setAttribute('rel', 'canonical');
      document.head.appendChild(links);
    }
    links.setAttribute('href', url);
  }
  
  ngOnInit(){
    let urlnase = document.URL
    let tokenUrl = urlnase.split("/")[2].split("--")[0] + "--"
    if(urlnase.includes(tokenUrl)){
      let baseurlsplit = urlnase.split(tokenUrl)
      let originURL:any = baseurlsplit[0] + baseurlsplit[1]
      return window.location = originURL
    }
  }
  
  
  
  
}
