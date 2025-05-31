import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

 // Angular-ის კომპონენტის ციკლის ჰუკი, რომელიც გამოძახებისას პირველად იმოქმედებს კომპონენტის ჩატვირთვისას
  ngOnInit() {
    this.languageSistem(); // ენის შემოწმება და სათაურების შესაბამის ენაზე გაწერა
  }

  // ობიექტი, რომელიც შეიცავს უნარებს (skills) და შესაბამის სათაურებს (titles)
  skillobject: any = [
    {
      title: '', // პირველი კატეგორიის სათაური (მაგ. Frontend development)
      skill: [
        'HTML', 'CSS', 'SCSS', 'JAVASCRIPT', 'ANGULAR', 'BOOTSTRAP', 'TAILWINDCSS', 'TYPESCRIPT'
      ] // Frontend ტექნოლოგიები
    },
    {
      title: '', // მეორე კატეგორიის სათაური (მაგ. Tools)
      skill: [
        'POSTMAN', 'GIT', 'GITHUB'
      ] // განვითარების ინსტრუმენტები
    }
  ]

  // ენის მიხედვით სათაურების განსაზღვრა (დაყრდნობით body class-ზე)
  languageSistem() {
    // მცირედი დაგვიანებით ვამოწმებთ body-ს class-ს, რადგან შესაძლოა ჯერ არ იყოს დაყენებული
    setTimeout(() => {
      // თუ საიტის ენა არის ინგლისური
      if (document.querySelector("body")?.className.includes('usa-lang')) {
        this.skillobject[0].title = 'Frontend development'; // პირველი ჯგუფის სათაური
        this.skillobject[1].title = 'Tools'; // მეორე ჯგუფის სათაური
      }
      // თუ საიტის ენა არის ქართული
      else if (document.querySelector("body")?.className.includes("geo-lang")) {
        this.skillobject[0].title = 'Frontend დეველოპმენტი'; // პირველი ჯგუფის სათაური ქართულად
        this.skillobject[1].title = 'ხელსაწყოები'; // მეორე ჯგუფის სათაური ქართულად
      }
    }, 1); // 1 მილიწამით დაგვიანება
  };
  
}
