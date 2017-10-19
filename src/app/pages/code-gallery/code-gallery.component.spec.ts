import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGalleryComponent } from './code-gallery.component';

describe('CodeGalleryComponent', () => {
  let component: CodeGalleryComponent;
  let fixture: ComponentFixture<CodeGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
