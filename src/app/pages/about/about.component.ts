import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  

  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
  }

  ngOnInit() {
    var pageName: string =      'about';
    var bgBaseColour: string =  'hsl(112, 80%, 70%)';
    var textColour: string =    'hsl(112, 80%, 15%)';
    var accentColour: string =  'hsl(222, 40%, 40%)';
    
    this.backgroundGeneratorService.colourChange( pageName,
                                                  bgBaseColour,
                                                  textColour,
                                                  accentColour );
  }


  ngOnDestroy() {
    this.backgroundGeneratorService.clearColours('about');
  }
}
