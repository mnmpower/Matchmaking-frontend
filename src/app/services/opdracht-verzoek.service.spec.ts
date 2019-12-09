import { TestBed } from '@angular/core/testing';

import { OpdrachtVerzoekService } from './opdracht-verzoek.service';

describe('OpdrachtVerzoekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpdrachtVerzoekService = TestBed.get(OpdrachtVerzoekService);
    expect(service).toBeTruthy();
  });
});
