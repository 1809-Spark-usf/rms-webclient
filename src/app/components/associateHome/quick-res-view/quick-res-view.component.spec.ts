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
  let reservationServiceStub: Partial<ReservationService>
  let reservationService;
  let dummyReservationSub: Subject<Reservation[]> = new Subject();



  beforeEach(async(() => {
    reservationServiceStub = {
      currentReservation: new Reservation(),
      $currentReservation: new Subject<Reservation>(),
      userReservations: [new Reservation(), new Reservation()],
      $userReservations: new Subject<Reservation[]>(),
      getUserReservations: () => {
        return dummyReservationSub;
      },
      pushNewUserReservations: (list) => {}
    };
    TestBed.configureTestingModule({
      // providers: [{ provide: ReservationService, userValue: reservationServiceStub }],
      providers: [ReservationService],
      declarations: [QuickResViewComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickResViewComponent);
    // reservationService = fixture.debugElement.injector.get(ReservationService);
    component = fixture.componentInstance;
    reservationService = TestBed.get(ReservationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('viewReservation', () => {
    it('should hide results', () => {
      // const dummyReservationList: Reservation[] = [new Reservation()];
      // const dummyReservationSub: Subject<Reservation[]> = new Subject();
      // let reservationServiceStub = jasmine.createSpyObj('ReservationService', ['getUserReservations'])
      // reservationServiceStub.getUserReservations.and.returnValue(dummyReservationSub);
      // component.ngOnInit();
      // fixture.detectChanges();
      // // component.viewReservation();
      // // dummyReservationSub.next(dummyReservationList);
      // console.log(component.error);
      // expect(component.loaded).toBeFalsy();

      reservationService = reservationServiceStub;
      const comp = new QuickResViewComponent(reservationService);
      spyOn(comp, 'viewReservation'); //spy on things we -don't- want to run

      comp.ngOnInit();
      expect(comp.loaded).toBeFalsy();
    });

    it('should update list if list found', () => {
      let dummyReservationList: Reservation[] = [new Reservation(), new Reservation()];
      const comp = new QuickResViewComponent(<ReservationService> reservationServiceStub);
      comp.viewReservation();
      dummyReservationSub.next(dummyReservationList);
      expect(comp.userReservations).toBe(dummyReservationList);
      expect(comp.loaded).toBeTruthy();
      expect(comp.error).toBeFalsy();
    });

    it('should not find a list if an error occurred', () => {
      const comp = new QuickResViewComponent(<ReservationService> reservationServiceStub);
      comp.viewReservation();
      dummyReservationSub.error(new Error());
      expect(comp.userReservations).toEqual([]);
      expect(comp.loaded).toBeTruthy();
      expect(comp.error).toBeTruthy();
    });
  });

});
