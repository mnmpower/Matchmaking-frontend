import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdrachtenLijstComponent } from './opdrachten-lijst.component';

describe('OpdrachtenLijstComponent', () => {
  let component: OpdrachtenLijstComponent;
  let fixture: ComponentFixture<OpdrachtenLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdrachtenLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdrachtenLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
