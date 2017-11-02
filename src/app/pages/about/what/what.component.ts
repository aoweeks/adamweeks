import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'aw-what',
  templateUrl: './what.component.html',
  styleUrls: ['./what.component.scss']
})
export class WhatComponent implements AfterViewInit {

  private codeText: string = '';
  
  private  codeTextTemplate: string[] = [
      "Hello",
      "Is there anybody out there?",
      "Hello?",
      "Is it me you're looking for?",
      "I can see it in your eyes"
    
  ];
  
  
  private position: number[] = [0,0];
  
  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.nextKeystroke();
  }
  
  public nextKeystroke(){
    
    let delayMultiplier: number = 1;
    
    if(this.position[1] == this.codeTextTemplate[this.position[0]].length ){
      this.position[0]++;
      if(this.position[0] == this.codeTextTemplate.length){this.position[0] = 0};
      this.position[1] = 0;
      
      let newLineTemplate: string = `<tspan id="code-line-${this.position[0]}" x="2px" dy="6px">
                                     </tspan>`;
    }
    else{
      this.codeText += this.codeTextTemplate[this.position[0]].charAt(this.position[1]);
      this.position[1]++;  
    }
    
    setTimeout(() => this.nextKeystroke(), 500); 
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
