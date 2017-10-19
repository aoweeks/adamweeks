import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './sections/header/header.component';
import { FooterComponent } from './sections/footer/footer.component';
import { LandingComponent } from './pages/home/landing/landing.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent
  ],
  imports: [
    AppRouting,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [ BackgroundGeneratorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
