import { TestBed, inject } from '@angular/core/testing';

import { AdminOtherService } from './admin-other.service';

describe('AdminOtherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOtherService]
    });
  });

  it('should be created', inject([AdminOtherService], (service: AdminOtherService) => {
    expect(service).toBeTruthy();
  }));
});
