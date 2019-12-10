import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverzichtComponent } from './user-overzicht.component';

describe('UserOverzichtComponent', () => {
  let component: UserOverzichtComponent;
  let fixture: ComponentFixture<UserOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
