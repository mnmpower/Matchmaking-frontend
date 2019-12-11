import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbedrijvenbeherenComponent } from './adminbedrijvenbeheren.component';

describe('AdminbedrijvenbeherenComponent', () => {
  let component: AdminbedrijvenbeherenComponent;
  let fixture: ComponentFixture<AdminbedrijvenbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbedrijvenbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbedrijvenbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
