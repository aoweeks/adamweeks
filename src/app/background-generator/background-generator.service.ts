import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundGeneratorService {
  
  bgColours: string[] = ['red'];
  
  constructor() {
    
  }
  
  public colourChange(baseColour: string) : void{
      this.bgColours[0] = baseColour;
  }


  public toggleColour(){
  
  }
}
