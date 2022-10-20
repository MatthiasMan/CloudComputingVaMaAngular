import { TestBed } from '@angular/core/testing';

import { DocSelectionChangedService } from './doc-selection-changed.service';

describe('DocSelectionChangedService', () => {
  let service: DocSelectionChangedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocSelectionChangedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
