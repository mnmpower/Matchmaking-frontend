import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmakersbeherenComponent } from './adminmakersbeheren.component';

describe('AdminmakersbeherenComponent', () => {
  let component: AdminmakersbeherenComponent;
  let fixture: ComponentFixture<AdminmakersbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmakersbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmakersbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
