import jss from 'jss';
import nested from 'jss-nested';

import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundGeneratorService {
  

  textColour: string;
  
  browserOffset = {
    currentX: 0,
    currentY: 0,
    prevX: 0,
    prevY: 0
  };
  
  styleSheets: any[] = [];
  
  
  
  constructor() {
    
    /* Set up JSS stuff*/
    jss.use(nested());
    
    const createGenerateClassName = () => {
      return (rule) => rule.key;
    }
    
    jss.setup({createGenerateClassName});
  }
  
  
  
  // Remember the scroll pos when navigating to new page
  public newPage(){
      console.log(this.browserOffset.currentY);
      this.browserOffset.prevY += this.browserOffset.currentY;
  }
  
  
  
  // Change the background colours to shades of a base colour given by the page
  
  public colourChange( page: string = '',
                       bgColour: string = '',
                       textColour: string = '',
                       accentColour: string = '' ): void{
    
    let bgAdjustments = [0, -5, 10, 5];
    let bgDarkAdjustments = [-20, -25, -10, -15]; //TEMP. hashrocket function here.
    let accentAdjustments = [0, 5, -5];
    
    // if this.styleSheets[page]{
    //   delete this.styleSheets[page];
    // }
    
    this.styleSheets[page] = jss.createStyleSheet();
    
    if (bgColour){
      let colours = this.findShades(bgColour, bgAdjustments);
      let darkColours = this.findShades(bgColour, bgDarkAdjustments);
      
      this.styleSheets[page].addRules({
        'backgroundSVG': {
          '& .triangleColour0': {
            fill: colours[0]
          },
          '& .triangleColour1': {
            fill: colours[1]
          },
          '& .triangleColour2': {
            fill: colours[2]
          },
          '& .triangleColour3': {
            fill: colours[3]
          }
        },
        'headerSVG': {
          '& .triangleColour0': {
            fill: darkColours[0]
          },
          '& .triangleColour1': {
            fill: darkColours[1]
          },
          '& .triangleColour2': {
            fill: darkColours[2]
          },
          '& .triangleColour3': {
            fill: darkColours[3]
          }
        }
      });
      
  
      
      console.log(this.styleSheets[page]);
    }
    
    // if()
    // this.styleSheets[page].addRules({
    //   ''
    // });
    
    
    if (accentColour){
      let accentColours = this.findShades( accentColour, accentAdjustments);
      this.styleSheets[page].addRules({
        'accentColourStroke': {
          stroke: accentColours[0]
        }
      });
      
    }
    
    
    if (textColour){
      this.textColour = textColour;
      
    }
    
    
    this.styleSheets[page].attach();
    
    
  }
  
  
  /* Triggered by a page that changes the colour scheme, when it is exited,
   * clears relevant stylesheet from DOM and registry. */
  public clearColours(page: string){
    this.styleSheets[page].detach();
    jss.removeStyleSheet(this.styleSheets[page]);
    delete this.styleSheets[page];
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
          hueAndSaturation + ', ' + (lightness + adjustment).toString() + '%)'
      );
    }
    
    return newShades;
  }
  
}
