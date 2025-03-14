import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }


  getproject(){
    return this.http.get('/assets/private/json/projects.json');
  }


  getlanguage(lang:string){
    switch(lang){
      case 'en':
      return this.http.get('/assets/private/json/en.json');
      case 'ka':
      return this.http.get('/assets/private/json/ka.json');
      default:
      return this.http.get('/assets/private/json/en.json');
    }
  }
  
  
}
