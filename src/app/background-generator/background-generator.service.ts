import jss from 'jss';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BackgroundGeneratorService {
  
  colours: any[] = [];
  darkColours: any[] = []
  
  accentColours: any[] = [];
  
  textColour: string;
  
  browserOffset = {
    currentX: 0,
    currentY: 0,
    prevX: 0,
    prevY: 0
  };
  
  constructor(private sanitizer: DomSanitizer) {
    
  }
  
  // Remember the scroll pos when navigating to new page
  public newPage(){
      console.log(this.browserOffset.currentY);
      this.browserOffset.prevY += this.browserOffset.currentY;
  }
  
  // Change the background colours to shades of a base colour given by the page
  
  public colourChange(bgColour: string =      'hsl(0, 0%, 50%)',
                      textColour: string =    'hsl(0, 0%, 100%)',
                      accentColour: string =  'hsl(90, 90%, 60%)'): void{
    
    var bgAdjustments = [0, -5, 10, 5];
    var bgDarkAdjustments = [-20, -25, -10, -15]; //TEMP. hashrocket function here.
    var accentAdjustments = [0, 5, -5];
    
    this.colours = this.findShades(bgColour, bgAdjustments);
    this.darkColours = this.findShades(bgColour, bgDarkAdjustments);
    this.accentColours = this.findShades(accentColour, accentAdjustments);
    this.textColour = textColour;
  }

  // Return how much to offset the background y-axis by, which is the current
  // scroll pos + how much the scroll pos was when previous links clicked
  public getYOffset(): number{
    console.log( this.browserOffset.currentY + this.browserOffset.prevY );
    return this.browserOffset.currentY + this.browserOffset.prevY;
  }
  
  public updateYOffset(): void{
    console.log(this.browserOffset.currentY);
    this.browserOffset.currentY = -window.scrollY;
  }

  
  // Return an array of shades of a given HSL colour
  
  private findShades(baseColour: string, lightnessAdjustments: number[]): any[] {
    
    var newShades: any[] = [];
    
    var hslPieces = baseColour.split(",");
    var hueAndSaturation: string = hslPieces[0] + "," + hslPieces[1];
    var lightness: number = parseInt(hslPieces[2], 10);
    
    
    for(var adjustment of lightnessAdjustments){
      newShades.push(
        this.sanitizer.bypassSecurityTrustStyle(
          hueAndSaturation + ', ' + (lightness + adjustment).toString() + '%'
        )
      );
    }
    
    return newShades;
  }
  
  private scrollHandler() {
    // Do whatever
    
    // console.log('hpo');
    // this.yOffset = window.scrollY;
    // requestAnimationFrame(this.scrollHandler);
  }
}
