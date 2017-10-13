import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundGeneratorService {

  constructor() {
      document.body.style.backgroundColor = 'blue';
      alert("I'm ALIVE");
  }
  
  public colourChange(baseColour: string) : void{
      document.body.style.backgroundColor = baseColour;
  }

}
