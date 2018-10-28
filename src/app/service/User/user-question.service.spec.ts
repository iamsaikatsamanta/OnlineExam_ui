import { TestBed, inject } from '@angular/core/testing';

import { UserQuestionService } from './user-question.service';

describe('UserQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserQuestionService]
    });
  });

  it('should be created', inject([UserQuestionService], (service: UserQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
