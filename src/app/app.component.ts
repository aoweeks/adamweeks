import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { routerTransition } from './router.animations';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';


@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  constructor(  private backgroundGeneratorService: BackgroundGeneratorService,
                private titleService: Title ){
    
  }
  
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.backgroundGeneratorService.updateYOffset();
  }
  
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
