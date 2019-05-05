import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResouceComponent } from './admin-resouce.component';

describe('AdminResouceComponent', () => {
  let component: AdminResouceComponent;
  let fixture: ComponentFixture<AdminResouceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResouceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResouceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
