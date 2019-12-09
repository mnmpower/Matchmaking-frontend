import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaakopdrachtComponent } from './maakopdracht.component';

describe('MaakopdrachtComponent', () => {
  let component: MaakopdrachtComponent;
  let fixture: ComponentFixture<MaakopdrachtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaakopdrachtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaakopdrachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
