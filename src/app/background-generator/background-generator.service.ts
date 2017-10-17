import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BackgroundGeneratorService {
  
  colours: any[] = [' hsl(50, 100%, 50%)'];
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
  
  public colourChange(baseColour: string): void{
    
    var hslPieces = baseColour.split(",");
    var hueAndSaturation: string = hslPieces[0] + "," + hslPieces[1];
    var lightness: number = parseInt(hslPieces[2], 10);
    
    this.colours = this.findShades(hueAndSaturation, lightness);
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
