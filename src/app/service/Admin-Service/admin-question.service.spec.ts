import { TestBed, inject } from '@angular/core/testing';

import { AdminQuestionService } from './admin-question.service';

describe('AdminQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminQuestionService]
    });
  });

  it('should be created', inject([AdminQuestionService], (service: AdminQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
