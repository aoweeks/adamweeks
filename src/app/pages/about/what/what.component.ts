import { Component, AfterContentInit, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'aw-what',
  templateUrl: './what.component.html',
  styleUrls: ['./what.component.scss']
})
export class WhatComponent implements AfterContentInit, AfterViewInit {

  @ViewChild('code')    code:   ElementRef;
  @ViewChild('cursor')  cursor: ElementRef;


  private animationActivated: boolean = false;
  
  // private codeText: string = '';
  private keywords: string[] = [
    "if",
    "return",
    "Date.now",
    "Date.",
    "Date",
    "private",
    "public"
  ]; 
  
  
  private codeTextTransform: string = 'translate(175, 150)';
  private  codeTextTemplate: string[] = [
       "public name = 'Adam Weeks';",
       "private age = Date.now() - 495417600;",
       "private codeWindow(){",
       "  if (true != false){",
       "    return 'Hello';",
       "  }",
       "}"
    
  ];
  
  
  private position: number[] = [0,0];
  private currentLine;
  
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
  }


  ngAfterContentInit() {
    this.createNewLine();
    this.nextKeystroke();
  }
  
  ngAfterViewInit(){
    setTimeout(() => {this.animationActivated = true}, 0);
  }
  
  private createNewLine(): void{
    this.currentLine = document.createElementNS(  'http://www.w3.org/2000/svg',
                                                  'tspan' );
    this.currentLine.setAttribute('x', "0px");
    this.currentLine.setAttribute('dy', "24px");
    this.code.nativeElement.appendChild(this.currentLine);
  }
  
  private nextKeystroke(){
    
    let extraDelay: number = 30;
    
    if(this.position[1] == this.codeTextTemplate[this.position[0]].length ){
      
      this.position[0]++;
      if(this.position[0] == this.codeTextTemplate.length){this.position[0] = 0};
      this.position[1] = 0;
      
      //Remove cursor
      this.currentLine.innerHTML = this.currentLine.innerHTML.slice(0, -1);
      
      this.createNewLine();
      this.currentLine.innerHTML = '|';
      
          console.log(this.code.nativeElement.children.length);

      if(this.code.nativeElement.children.length > 29){
        this.code.nativeElement.removeChild(this.code.nativeElement.firstChild);
      }

      extraDelay += (Math.random() * 100);
                                     
      /*let newLine = this.renderer.createElement('tspan');//, 'http://www.w3.org/2000/svg');
      let text = this.renderer.createText('Hello world!');
      
      
      this.renderer.setAttribute(newLine, 'dy', '20px');
      this.renderer.setAttribute(newLine, 'x', '10px');
      this.renderer.appendChild(newLine, text);
      
      
       let rect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
      
      this.renderer.setAttribute(rect, 'y', '20px');
      this.renderer.setAttribute(rect, 'x', '10px');
      this.renderer.setAttribute(rect, 'height', '20px');
      this.renderer.setAttribute(rect, 'width', '10px');
      this.renderer.setAttribute(rect, 'fill', 'red');
      this.renderer.setAttribute(rect, 'stroke', 'white');
      
       this.renderer.appendChild(this.vector.nativeElement, rect);
      
      
      console.log('yup');
      this.renderer.appendChild(this.code.nativeElement, newLine);
      //this.renderer.insertBefore(this.code.nativeElement, newLine, this.cursor);*/
                                     
      //append new line
    }
    else{
      this.position[1]++;
      
      let stage: string = this.codeTextTemplate[this.position[0]].substr(0, this.position[1]);
      
      this.keywords.forEach((keyword) => {
        stage = stage.replace(keyword, `<tspan class="accentFill">${keyword}</tspan>`);
      });
      
      this.currentLine.innerHTML = stage;
      
      // let splitStr = this.currentLine.innerHTML.split(" ");
      // if(splitStr[splitStr.length - 1] == 'Date'){
      //   splitStr[splitStr.length - 1] = '<tspan fill="orange">Date</tspan>';
      // } 
      
      // this.currentLine.innerHTML = splitStr.join(" ");
      this.currentLine.innerHTML += '|';
      
    }
    
    this.updateScrollPos();
    
    
    let delay = (Math.random() * 100) + extraDelay;
    setTimeout(() => this.nextKeystroke(), delay);
  }
  
  private updateScrollPos(): void{
    let yOffset: number = 150;
    
    let numOfLines: number = this.code.nativeElement.children.length;

    if(numOfLines > 12){
      let lineOverflow = numOfLines - 12;
      
      yOffset -= (lineOverflow * 24);
    }
    
    this.codeTextTransform = `translate(175,${yOffset})`;
  }
}
