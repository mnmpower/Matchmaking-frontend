import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedrijfProfielComponent } from './bedrijf-profiel.component';

describe('BedrijfProfielComponent', () => {
  let component: BedrijfProfielComponent;
  let fixture: ComponentFixture<BedrijfProfielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedrijfProfielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedrijfProfielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
