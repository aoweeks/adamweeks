import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BackgroundGeneratorService {
  
  colours: any[] = [' hsl(50, 100%, 50%)'];
  xOffset: number = 0;
  yOffset: number = 0;
  
  constructor(private sanitizer: DomSanitizer) {
    
  }
  
  
  
  // Change the background colours to shades of a base colour given by the page
  
  public colourChange(baseColour: string): void{
    
    var hslPieces = baseColour.split(",");
    var hueAndSaturation: string = hslPieces[0] + "," + hslPieces[1];
    var lightness: number = parseInt(hslPieces[2], 10);
    
    this.colours = this.findShades(hueAndSaturation, lightness);
  }



  public toggleColour(){
    this.xOffset += window.innerWidth;
    this.yOffset += 10;
  }
  
  // Return an array of shades of a given HSL colour
  
  private findShades(hueAndSaturation: string, lightness: number): string[] {
    
    var lightnessAdjustments: number[] = [0, 10, -5, -10];
    var newColours: any[] = [];
    
    for(var adjustment of lightnessAdjustments){
      newColours.push(
        this.sanitizer.bypassSecurityTrustStyle(
          hueAndSaturation + ', ' + (lightness + adjustment).toString() + '%'
        )
      );
    }
    
    return newColours;
  }
  
  private scrollHandler() {
    // Do whatever
    
    // console.log('hpo');
    // this.yOffset = window.scrollY;
    // requestAnimationFrame(this.scrollHandler);
  }
}
