import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintypesbeherenComponent } from './admintypesbeheren.component';

describe('AdmintypesbeherenComponent', () => {
  let component: AdmintypesbeherenComponent;
  let fixture: ComponentFixture<AdmintypesbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintypesbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintypesbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
