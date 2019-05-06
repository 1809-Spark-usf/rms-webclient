import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { ReservationsComponent } from '../../reservations/reservations/reservations.component';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         AdminHomeComponent,
         ReservationsComponent
       ]
  let fixture2: ComponentFixture<ReservationsComponent>;
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
