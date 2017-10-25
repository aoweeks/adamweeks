import { Component, OnInit } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'aw-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  constructor( private backgroundGeneratorService: BackgroundGeneratorService ) { }

  ngOnInit() {
  }

}
