import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';


import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './sections/header/header.component';
import { FooterComponent } from './sections/footer/footer.component';
import { LandingComponent } from './pages/home/landing/landing.component';
import { ArtGalleryComponent } from './pages/art-gallery/art-gallery.component';
import { CodeGalleryComponent } from './pages/code-gallery/code-gallery.component';
import { InfoComponent } from './pages/home/info/info.component';
import { SwitchComponent } from './shared-components/switch/switch.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ArtGalleryComponent,
    CodeGalleryComponent,
    InfoComponent,
    SwitchComponent
  ],
  imports: [
    AppRouting,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    InlineSVGModule
  ],
  providers: [ BackgroundGeneratorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
