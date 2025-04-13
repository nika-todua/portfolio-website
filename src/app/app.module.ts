import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { ProfilefactsComponent } from './profilefacts/profilefacts.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './skills/skills.component';
import { LinksComponent } from './page/links/links.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { AdsComponent } from './ads/ads.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    ProfilefactsComponent,
    TaskComponent,
    ProjectComponent,
    FooterComponent,
    SkillsComponent,
    LinksComponent,
    NotfoundComponent,
    AdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
