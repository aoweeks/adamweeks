import jss from 'jss';
import nested from 'jss-nested';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  
  
  constructor(private sanitizer: DomSanitizer) {
    
    // Set up JSS stuff
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
    
    let bgAdjustments = [0, 1, -1, 2, -2, 3, -3];
    let bgDarkAdjustments = [-20, -19, -21, -18, -22, -17, -23]; //TEMP. hashrocket function here.
    let accentAdjustments = [0, 5, -5];
    
    textColour += '!important';
    
    // if this.styleSheets[page]{
    //   delete this.styleSheets[page];
    // }
    
    this.styleSheets[page] = jss.createStyleSheet();
    
    if (bgColour){
      let colours = this.findShades(bgColour, bgAdjustments);
      let darkColours = this.findShades(bgColour, bgDarkAdjustments);
      
      
      
      this.styleSheets[page].addRules({
        'backgroundSVG': {
          '& .bgtc0': {
            fill: colours[0]
          },
          '& .bgtc1': {
            fill: colours[1]
          },
          '& .bgtc2': {
            fill: colours[2]
          },
          '& .bgtc3': {
            fill: colours[3]
          },
          '& .bgtc4': {
            fill: colours[4]
          },
          '& .bgtc5': {
            fill: colours[5]
          },
          '& .bgtc6': {
            fill: colours[6]
          }
        },
        'headerSVG': {
          '& .bgtc0': {
            fill: darkColours[0]
          },
          '& .bgtc1': {
            fill: darkColours[1]
          },
          '& .bgtc2': {
            fill: darkColours[2]
          },
          '& .bgtc3': {
            fill: darkColours[3]
          },
          '& .bgtc4': {
            fill: darkColours[4]
          },
          '& .bgtc5': {
            fill: darkColours[5]
          },
          '& .bgtc6': {
            fill: darkColours[6]
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
        
        'nav-logo': {
        
          '& .accentColourStroke': {
            stroke: accentColours[0]
          },
          
          '&:hover': {
              
            '& .accentColourStroke': {
              stroke: textColour
            }
          }
        }
      });
      
    }
    
    
    if (textColour){
      this.textColour = textColour;
      
    }
    
    
    setTimeout( () => { this.styleSheets[page].attach(); }, 500);
    
    
  }

  
  /* Triggered by a page that changes the colour scheme, when it is exited,
   * clears relevant stylesheet from DOM and registry. */
  public clearColours(page: string): void{
    setTimeout( () => {
      this.styleSheets[page].detach();
      jss.removeStyleSheet(this.styleSheets[page]);
      delete this.styleSheets[page];
    }, 500);
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
          hueAndSaturation + ', ' + (lightness + adjustment).toString() + '%) !important'
      );
    }
    
    return newShades;
  }
  
}
