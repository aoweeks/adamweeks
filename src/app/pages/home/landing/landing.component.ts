import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'aw-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent{

  @Output()
  segmentChange: EventEmitter<string> = new EventEmitter<string>();
  
  
  /*  If down, pgdn or spacebar key is pressed, transition to the
  *   info segment   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    let x = event.keyCode;
    if (x === 32 || x === 34 || x === 40) {
      this.goToInfo();
    }
  }
  
  @HostListener('wheel', ['$event'])
  mouseWheelScroll(event: any): void {
      console.log("Entered mouse wheel");
      console.log(event);
      if(event.deltaY > 0){
        this.goToInfo();
      }

      // this.initPointX = event.PageX;
      // this.initPointY = event.PageY;   
  } 
  
  
  constructor() { }

  goToInfo(): void{
    this.segmentChange.emit('info');
  }
}
