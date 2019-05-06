import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationPopupComponent } from './update-reservation-popup.component';

describe('UpdateReservationPopupComponent', () => {
  let ngbModalStub: {dismiss: jasmine.Spy};
  let resourceServiceStub: {
    getAvailableResources: jasmine.Spy,
    pushNewCurrentResourceList: jasmine.Spy
  }
  let userServiceStub = { currentUser: undefined };
  let reservationServiceStub = {
      cancelReservations: undefined,
      getUserReservations: undefined,
      pushNewUserReservations: undefined
  }
  
  let routerStub: {navigate: jasmine.Spy};

  let component: UpdateReservationPopupComponent;
  let fixture: ComponentFixture<UpdateReservationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReservationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userServiceStub = { currentUser: undefined };
    ngbModalStub = { dismiss: undefined };
    reservationServiceStub = {
        cancelReservations: undefined,
        getUserReservations: undefined,
        pushNewUserReservations: undefined
    }
    resourceServiceStub = {
      getAvailableResources: undefined,
      pushNewCurrentResourceList: undefined
    }
  });

  it('should create', () => {
    component = new UpdateReservationPopupComponent(<any>ngbModalStub, <any>reservationServiceStub, <any>userServiceStub, <any>resourceServiceStub, <any> routerStub);
    expect(component).toBeTruthy();
});
});
