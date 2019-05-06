import { ReservationsComponent } from "./reservations.component";
import { Reservation } from 'src/app/models/reservation';
import { Subject, Observable, from } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelReservationPopupComponent } from '../cancel-reservation-popup/cancel-reservation-popup.component';
/**
 * Unit Tests for Loading Component
 * @author Jose Meono
 */
describe('ReservationsComponent', () => {
    let component: ReservationsComponent;

    // Declare mocks
    let ngbAccordionConfigStub: {
        closeOthers: boolean,
        type: string,
    };
    let modalServiceStub: {
        open: jasmine.Spy,
    };
    let reservationServiceStub: {
        userReservations: Reservation[],
        $userReservations: Subject<Reservation[]>,
        getUserReservations: jasmine.Spy,
        pushNewUserReservations: jasmine.Spy,
        getAllReservations: jasmine.Spy,
    };

    // Initialize mocks
    beforeEach(() => {
        ngbAccordionConfigStub = {
            closeOthers: true,
            type: 'warning',
        };
        modalServiceStub = {
            open: spyOn(NgbModal.prototype, 'open'),
        };
        reservationServiceStub = {
            userReservations: [new Reservation(), new Reservation()],
            $userReservations: new Subject(),
            getUserReservations: undefined,
            pushNewUserReservations: undefined,
            getAllReservations: undefined,
        };
    });

    it('should create', () => {
        component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
        expect(component).toBeTruthy();
    });
    describe('loadValues', () => {
        it('should initialize variables', () => {
            component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
            component.ngOnInit();
            expect(ngbAccordionConfigStub.closeOthers).toBeTruthy();
            expect(ngbAccordionConfigStub.type).toBe('warning');
            expect(component.loaded).toBeTruthy();
            expect(component.error).toBeFalsy();
        });
        it('should set this.userReservations to be the data passed in the subscriber', () => {
            component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
            const dummyReservationsList = [new Reservation(), new Reservation(), new Reservation()];
            component.ngOnInit();
            reservationServiceStub.$userReservations.next(dummyReservationsList);
            expect(component.userReservations).toBe(dummyReservationsList);
            expect(component.userResSub).toBeTruthy();
        });
        it('should set this.userReservation to reservationService.userReservation if it exists', () => {
            component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
            component.ngOnInit();
            expect(component.userReservations).toBe(reservationServiceStub.userReservations);
        });
        it('should call getUserReservation and pushNewReservation if false reservation.userReservation', () => {
            reservationServiceStub.userReservations = null;
            const dummyUserSub = new Subject();
            const dummyListReservation = [new Reservation(), new Reservation()];
            const dummyTestObservable = from(dummyListReservation);

            reservationServiceStub.getUserReservations = spyOn(ReservationService.prototype, 'getUserReservations');
            reservationServiceStub.pushNewUserReservations = spyOn(ReservationService.prototype, 'pushNewUserReservations');

            reservationServiceStub.getAllReservations = spyOn(ReservationService.prototype,'getAllReservations');

            reservationServiceStub.getUserReservations.and.returnValue(dummyUserSub);
            reservationServiceStub.getAllReservations.and.returnValue(dummyTestObservable);

            component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
            component.ngOnInit();

            expect(reservationServiceStub.pushNewUserReservations).toHaveBeenCalledWith(dummyListReservation[0]);
        });
        it('should unsubscribe on ngOnDestroy', () => {
            const dummyUserSub = new Subject();
            component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
            component.userResSub = dummyUserSub.subscribe();
            component.ngOnDestroy();
            expect(component.userResSub.closed).toBeTruthy();
        });
    });
});
