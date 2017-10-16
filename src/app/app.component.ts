import { Component, HostListener } from '@angular/core';
import { routerTransition } from './router.animations';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';

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
    this.backgroundGeneratorService.yOffset = -window.scrollY;
  }
  
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
