import { Component, OnInit } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
  }

  ngOnInit() {
    this.backgroundGeneratorService.colourChange('hsl(112, 80%, 70%)', 'hsl(112, 80%, 15%)');
  }

}
