import { AdminVerifiedComponent } from './admin-verified.component';
import { Router } from '@angular/router';

/**
 * Admin Verified Component Unit Tests
 */
describe('AdminVerifiedComponent', () => {
  let component: AdminVerifiedComponent;

  let routerStub: {navigate: jasmine.Spy};

  beforeEach(() => {
    routerStub = {
      navigate: spyOn(Router.prototype, 'navigate'),
    };
    component = new AdminVerifiedComponent(routerStub as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToLogin', () => {
    it('should call navigate', () => {
      component.goToLogin();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
