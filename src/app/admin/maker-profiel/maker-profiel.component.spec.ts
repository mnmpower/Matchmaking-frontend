import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerProfielComponent } from './maker-profiel.component';

describe('MakerProfielComponent', () => {
  let component: MakerProfielComponent;
  let fixture: ComponentFixture<MakerProfielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerProfielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerProfielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
