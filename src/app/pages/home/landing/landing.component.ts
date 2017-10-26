import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aw-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent{

  @Output()
  segmentChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  goToInfo(): void{
    this.segmentChange.emit('info');
  }
}
