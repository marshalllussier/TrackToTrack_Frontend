import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./utils/auth.guard";


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
