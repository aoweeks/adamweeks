import { Component, OnInit, OnDestroy } from '@angular/core';
import {trigger, animate, style, group, query, transition} from '@angular/animations';

import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('changeSegment',[
      transition('landing => info',
        group([
          query(':leave', [
            animate('1.25s ease-in',
              style({
                transform: 'translateY(-100%)',
                opacity: 0
              })
            )
          ],{ optional: true }),
          query(':enter', [
            style({opacity: 0}),
            animate('1.25s ease-in',
              style({
                transform: 'translateY(-100%)',
                opacity: 1
              })
            )      
          ],{ optional: true }),
        ])
      )
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private segment: string = 'landing';
  
  private page = 'home';

  constructor(  private backgroundGeneratorService: BackgroundGeneratorService ){
  }

  ngOnInit() {
    var pageName: string =      this.page;
    var bgBaseColour: string =  'hsl(0, 59%, 40%)';
    var textColour: string =    'hsl(112, 80%, 85%)';
    var accentColour: string =  'hsl(202, 40%, 60%)';
    
    this.backgroundGeneratorService.colourChange( pageName,
                                                  bgBaseColour,
                                                  textColour,
                                                  accentColour );
  }

  
  
  segmentChange(event){
    this.segment = event;
  }
  
  
  ngOnDestroy() {
    this.backgroundGeneratorService.clearColours( this.page );
  }
  
}
