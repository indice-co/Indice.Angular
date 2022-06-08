import { TestBed } from '@angular/core/testing';

import { AppLanguagesService } from '../services/app-languages.service';

describe('AppLanguagesServiceService', () => {
  let service: AppLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
