import jss from 'jss';
import nested from 'jss-nested';

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BackgroundGeneratorService {
  
  private funMode: boolean = true;
  private delay: number = 0;
  
  private backgroundURL: string = "assets/images/background-medium.svg";
  
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
  
  
  public updateSize( width: number, height: number): void {
    let imageURL: string = "assets/images/background-";
    
    if (width < 800){
      this.backgroundURL = imageURL + "small.svg";
    }
    else if (width > 799 && width < 2000){
      this.backgroundURL = imageURL + "medium.svg"
    }    
    else {
      this.backgroundURL =  imageURL + "large.svg";
    }
  }
  
  public getBackgroundURL(): string{
    return this.backgroundURL;
  }
  
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
      let accentAdjustments = [0, 5, -5];
      
      textColour += '!important';

      this.styleSheets[page] = jss.createStyleSheet();
      
      if (bgColour){
        let colours = this.findShades(bgColour, bgAdjustments);
        
        this.styleSheets[page].addRules({
          'bgtc0': {
            fill: colours[0]
          },
          'bgtc1': {
            fill: colours[1]
          },
          'bgtc2': {
            fill: colours[2]
          },
          'bgtc3': {
            fill: colours[3]
          },
          'bgtc4': {
            fill: colours[4]
          },
          'bgtc5': {
            fill: colours[5]
          },
          'bgtc6': {
            fill: colours[6]
          }
        });
    
      }
      
      if (accentColour){
        let accentColours = this.findShades( accentColour, accentAdjustments );
        this.styleSheets[page].addRules({
          
          
          'accentColour': {
            color: accentColours[0],
            stroke: accentColours[0]
          },
          'active': {
            '& .nav-link-box': {
              color: accentColours[0]
            }
          },
          'nav-link': {
            '&:hover': {
                '& .nav-link-box':{
                  color: accentColours[0]
                }
              },
              '&:focus': {
                '& .nav-link-box':{
                  color: accentColours[0]
                }
              }   
            },
            'nav-link-box': {
              '&:before': {
                'border-color': accentColours[0]
              },
              
              '&:after': {
                'border-color': accentColours[0]
              }
            }
          // 'nav-logo': {
          
          //   '& .accentColour': {
          //     stroke: accentColours[0]
          //   },
            
          //   '&:hover': {
                
          //     '& .accentColourStroke': {
          //       stroke: textColour
          //     }
          //   }
          // }
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
      
      
      setTimeout( () => {
        this.styleSheets[page].attach();
      }, this.delay);

      this.delay = 750;
      
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
      }, 950);
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
