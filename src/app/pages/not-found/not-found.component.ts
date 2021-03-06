import { Component, OnInit } from '@angular/core';
import { BackgroundGeneratorService } from '../../background-generator/background-generator.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private backgroundGeneratorService: BackgroundGeneratorService){
  }

  ngOnInit() {
    this.backgroundGeneratorService.newPage();
    this.backgroundGeneratorService.colourChange( 'hsl(200, 50%, 70%)' );
  }

}
