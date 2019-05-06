import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationPopupComponent } from './update-reservation-popup.component';

describe('UpdateReservationPopupComponent', () => {
  let component: UpdateReservationPopupComponent;
  let fixture: ComponentFixture<UpdateReservationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReservationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReservationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
