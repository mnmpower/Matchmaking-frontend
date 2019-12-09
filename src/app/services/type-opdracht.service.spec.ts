import { TestBed } from '@angular/core/testing';

import { TypeOpdrachtService } from './type-opdracht.service';

describe('TypeOpdrachtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeOpdrachtService = TestBed.get(TypeOpdrachtService);
    expect(service).toBeTruthy();
  });
});
