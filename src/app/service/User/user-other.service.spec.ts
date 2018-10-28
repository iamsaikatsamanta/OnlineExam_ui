import { TestBed, inject } from '@angular/core/testing';

import { UserOtherService } from './user-other.service';

describe('UserOtherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOtherService]
    });
  });

  it('should be created', inject([UserOtherService], (service: UserOtherService) => {
    expect(service).toBeTruthy();
  }));
});
