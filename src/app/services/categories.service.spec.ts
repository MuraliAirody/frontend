import { TestBed } from '@angular/core/testing';

import { ViewCategoriesService } from './categories.service';

describe('ViewCategoriesService', () => {
  let service: ViewCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
