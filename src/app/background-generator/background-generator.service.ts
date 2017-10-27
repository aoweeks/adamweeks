import jss from 'jss';
import nested from 'jss-nested';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BackgroundGeneratorService {
  
  private funMode: boolean = false;
  
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
  
  //=====GETTERS AND SETTERS=======
  
  
  public getFunMode(): boolean{
    return this.funMode;
  }
  
  public toggleFunMode(): void{
    this.funMode = !this.funMode;
  }
  
  
  // Remember the scroll pos when navigating to new page
  public newPage(){
      this.browserOffset.prevY += this.browserOffset.currentY;
  }
  
  
  
  // Change the background colours to shades of a base colour given by the page
  
  public colourChange( page: string = '',
                       bgColour: string = '',
                       textColour: any = '',
                       accentColour: string = '' ): void{
                         
    if(this.funMode) {
      
      let bgAdjustments = [0, -1, 1, -2, 2, -3, 3];
      let bgDarkAdjustments = [-20, -21, -19, -22, -18, -23, -17]; //TEMP. hashrocket function here.
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
        textColour = this.sanitizer.bypassSecurityTrustStyle(textColour);
        this.styleSheets[page].addRules({
          'textColour': {
            color: textColour
          }
        });
        
      }
      
      
      // If first page loaded
      setTimeout( () => { this.styleSheets[page].attach(); }, 500);
      // Else
      //  do instantly
    
      
    }
    
  }

  
  /* Triggered by a page that changes the colour scheme, when it is exited,
   * clears relevant stylesheet from DOM and registry. */
  public clearColours(page: string): void{
    if(this.styleSheets[page]){
      setTimeout( () => {
        this.styleSheets[page].detach();
        jss.removeStyleSheet(this.styleSheets[page]);
        delete this.styleSheets[page];
      }, 500);
    }
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
