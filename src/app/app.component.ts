import { Component } from '@angular/core';
import { routerTransition } from './router.animations';
import { BackgroundGeneratorService } from './background-generator/background-generator.service';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  color = 'green';
  
  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
    
  }
  
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
