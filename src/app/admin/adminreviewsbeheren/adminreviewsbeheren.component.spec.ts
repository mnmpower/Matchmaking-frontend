import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreviewsbeherenComponent } from './adminreviewsbeheren.component';

describe('AdminreviewsbeherenComponent', () => {
  let component: AdminreviewsbeherenComponent;
  let fixture: ComponentFixture<AdminreviewsbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminreviewsbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminreviewsbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
