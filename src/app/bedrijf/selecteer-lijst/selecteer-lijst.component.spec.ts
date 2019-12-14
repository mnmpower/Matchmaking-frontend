import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecteerLijstComponent } from './selecteer-lijst.component';

describe('SelecteerLijstComponent', () => {
  let component: SelecteerLijstComponent;
  let fixture: ComponentFixture<SelecteerLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecteerLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecteerLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
