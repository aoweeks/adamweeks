import { TestBed, inject } from '@angular/core/testing';

import { BackgroundGeneratorService } from './background-generator.service';

describe('BackgroundGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundGeneratorService]
    });
  });

  it('should be created', inject([BackgroundGeneratorService], (service: BackgroundGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
