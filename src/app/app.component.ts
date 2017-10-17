import { Component, HostListener } from '@angular/core';
import { routerTransition } from './router.animations';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';
import { FooterComponent } from './sections/footer/footer.component';
import { HeaderComponent } from './sections/header/header.component';


@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
    
  }
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.backgroundGeneratorService.updateYOffset();
  }
  
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
