import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  
  private page = 'about';

  constructor(  private backgroundGeneratorService: BackgroundGeneratorService ){
  }

  ngOnInit() {
    var pageName: string =      this.page;
    var bgBaseColour: string =  'hsl(300, 40%, 29%)';
    var textColour: string =    'hsl(112, 80%, 15%)';
    var accentColour: string =  'hsl(122, 40%, 70%)';
    
    this.backgroundGeneratorService.colourChange( pageName,
                                                  bgBaseColour,
                                                  textColour,
                                                  accentColour );
  }


  ngOnDestroy() {
    this.backgroundGeneratorService.clearColours( this.page );
  }
}
