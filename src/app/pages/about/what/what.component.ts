import { Component, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'aw-what',
  templateUrl: './what.component.html',
  styleUrls: ['./what.component.scss']
})
export class WhatComponent implements AfterViewInit {

  @ViewChild('code')    code:   ElementRef;
  @ViewChild('cursor')  cursor: ElementRef;

  private codeText: string = '';
  
  private  codeTextTemplate: string[] = [
      "Hello",
      "Is there anybody out there?",
      "Hello?",
      "Is it me you're looking for?",
      "I can see it in your eyes"
    
  ];
  
  
  private position: number[] = [0,0];
  private currentLine;
  
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
  }


  ngAfterViewInit() {
    this.createNewLine();
    this.nextKeystroke();
  }
  
  private createNewLine(): void{
    this.currentLine = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    this.currentLine.setAttribute('x', "10px");
    this.currentLine.setAttribute('dy', "20px");
    this.code.nativeElement.appendChild(this.currentLine);
  }
  
  public nextKeystroke(){
    
    let extraDelay: number = 50;
    
    if(this.position[1] == this.codeTextTemplate[this.position[0]].length ){
      this.position[0]++;
      if(this.position[0] == this.codeTextTemplate.length){this.position[0] = 0};
      this.position[1] = 0;
      
      //Remove cursor
      
      console.log(this.currentLine.innerHTML.slice(0, -1));
      this.currentLine.innerHTML = this.currentLine.innerHTML.slice(0, -1);
      this.createNewLine();
      
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
      
      //Delete the cursor on a new line
      if(this.position[1] == 0){ this.currentLine.innerHTML = "" }
      this.position[1]++;
      this.currentLine.innerHTML = this.codeTextTemplate[this.position[0]].substr(0, this.position[1]);
      this.currentLine.innerHTML += '|';
    }
    
    
    let delay = (Math.random() * 200) + extraDelay;
    setTimeout(() => this.nextKeystroke(), delay);
  }
  
  
  public getCodeText(): any{
    let cursor: string;
    
    if(this.position[1]){
      cursor = '<tspan class="code-cursor">|</tspan>';
    }
    else{
      cursor = '<tspan class="code-cursor" x="10" dy="20">|</tspan>'
    }
    
    return this.sanitizer.bypassSecurityTrustHtml(this.codeText + cursor);
  }
}
