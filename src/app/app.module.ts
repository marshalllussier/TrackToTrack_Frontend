import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from "./utils/auth.guard";
import { FooterComponent } from './components/landing-page/footer/footer.component';
import { HeaderComponent } from './components/landing-page/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
