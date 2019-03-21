import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { QuickResViewComponent } from './quick-res-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Reservation } from 'src/app/models/reservation';
import { Subject, Observable } from 'rxjs';

describe('QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;
  let reservationServiceStub: Partial<ReservationService>;
  let reservationService;

  beforeEach(async(() => {
    reservationServiceStub = {
      currentReservation: new Reservation(),
      $currentReservation: new Subject<Reservation>(),
      userReservations: [new Reservation(), new Reservation()],
      $userReservations: new Subject<Reservation[]>(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ReservationService, userValue: reservationServiceStub }],
      declarations: [QuickResViewComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickResViewComponent);
    reservationService = fixture.debugElement.injector.get(ReservationService);
    component = fixture.componentInstance;
    reservationService = TestBed.get(ReservationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('viewReservations', () => {
    it('should hide results', () => {
      expect(component.loaded).toBeFalsy();
    });
    // it('updates list', () => {
    //   let dummyReservationList: Reservation[] = [new Reservation(), new Reservation()];
    // });
  });

});
