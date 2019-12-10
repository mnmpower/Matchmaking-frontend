import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminopdrachtenbeherenComponent } from './adminopdrachtenbeheren.component';

describe('AdminopdrachtenbeherenComponent', () => {
  let component: AdminopdrachtenbeherenComponent;
  let fixture: ComponentFixture<AdminopdrachtenbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminopdrachtenbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminopdrachtenbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
