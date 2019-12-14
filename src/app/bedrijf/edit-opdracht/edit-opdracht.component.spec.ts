import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpdrachtComponent } from './edit-opdracht.component';

describe('EditOpdrachtComponent', () => {
  let component: EditOpdrachtComponent;
  let fixture: ComponentFixture<EditOpdrachtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOpdrachtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpdrachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
