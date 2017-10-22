import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private page = 'home';

  constructor(  private backgroundGeneratorService: BackgroundGeneratorService ){
  }

  ngOnInit() {
    var pageName: string =      this.page;
    var bgBaseColour: string =  'hsl(0, 79%, 50%)';
    var textColour: string =    'hsl(112, 80%, 85%)';
    var accentColour: string =  'hsl(342, 40%, 40%)';
    
    this.backgroundGeneratorService.colourChange( pageName,
                                                  bgBaseColour,
                                                  textColour,
                                                  accentColour );
  }


  ngOnDestroy() {
    this.backgroundGeneratorService.clearColours( this.page );
  }

}
