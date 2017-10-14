import { Component, OnInit } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
  }

  ngOnInit() {
    this.backgroundGeneratorService.colourChange('darkblue');
  }

}
