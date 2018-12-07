import { TestBed } from '@angular/core/testing';

import { NewReservationService } from './new-reservation.service';

describe('NewReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewReservationService = TestBed.get(NewReservationService);
    expect(service).toBeTruthy();
  });
});
