import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundGeneratorService {
  
  bgColours = ['red'];
  
  constructor() {
    
  }
  
  public colourChange(baseColour: string) : void{
      document.body.style.backgroundColor = baseColour;
  }


  public toggleColour(){
  
  }
}
