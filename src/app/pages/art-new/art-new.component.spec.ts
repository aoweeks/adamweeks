import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtNewComponent } from './art-new.component';

describe('ArtNewComponent', () => {
  let component: ArtNewComponent;
  let fixture: ComponentFixture<ArtNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
