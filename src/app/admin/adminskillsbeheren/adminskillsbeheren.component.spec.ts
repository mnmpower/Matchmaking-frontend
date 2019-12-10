import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminskillsbeherenComponent } from './adminskillsbeheren.component';

describe('AdminskillsbeherenComponent', () => {
  let component: AdminskillsbeherenComponent;
  let fixture: ComponentFixture<AdminskillsbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminskillsbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminskillsbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
