import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintagsbeherenComponent } from './admintagsbeheren.component';

describe('AdmintagsbeherenComponent', () => {
  let component: AdmintagsbeherenComponent;
  let fixture: ComponentFixture<AdmintagsbeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintagsbeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintagsbeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
