import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSchrijvenComponent } from './review-schrijven.component';

describe('ReviewSchrijvenComponent', () => {
  let component: ReviewSchrijvenComponent;
  let fixture: ComponentFixture<ReviewSchrijvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSchrijvenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSchrijvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
