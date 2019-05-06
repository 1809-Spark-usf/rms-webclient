import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterResourceComponent } from './alter-resource.component';

describe('AlterResourceComponent', () => {
  let component: AlterResourceComponent;
  let fixture: ComponentFixture<AlterResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
