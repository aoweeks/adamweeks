import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundGeneratorService {
  
  colours: string[] = ['red'];
  xOffset: number = 0;
  yOffset: number = 0;
  
  constructor() {
    
  }
  
  public colourChange(baseColour: string) : void{
    this.colours[0] = baseColour;
  }


  public toggleColour(){
    this.xOffset += window.innerWidth;
    this.yOffset += 10;
  }
}
