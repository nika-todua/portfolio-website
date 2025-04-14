import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LinksComponent } from './page/links/links.component';
import { NotfoundComponent } from './page/notfound/notfound.component';

const routes: Routes = [
  {path: "",  component:HomepageComponent},
  {path: "links", component:LinksComponent},
  {path: "pagenotfound", component:NotfoundComponent},
  {path: "**", redirectTo: "pagenotfound", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
