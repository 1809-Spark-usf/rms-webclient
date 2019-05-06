import { AdminLoginComponent } from './admin-login.component';
import { Subject } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { IsAdminBehaviorSetService } from 'src/app/services/shared/is-admin-behavior-set.service';
import { TitleBehaviorSetService } from 'src/app/services/shared/title-behavior-set.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';


/**
 * Admin Login Component Unit Tests
 * @author Tyler Williams
 */
describe('AdminLoginComponent', () => {
    let component: AdminLoginComponent;

    // Mock dependencies for the component
    let adminLoginServiceStub: {
        validateUser: jasmine.Spy
    }

    let isAdminBehaviorSetServiceStub: {
        currentMessage: Subject<number>,
        changeBoolean: jasmine.Spy
    }

    let titleBehaviorSetServiceStub: {
        currentMessage: Subject<string>,
        changeMessage: jasmine.Spy
    } 

    let adminLoginRouterStub:Router

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();

        adminLoginRouterStub = TestBed.get(Router);

        adminLoginServiceStub = jasmine.createSpyObj('AdminLoginService', ['validateUser']);
        isAdminBehaviorSetServiceStub = {
            currentMessage: new Subject(),
            changeBoolean: spyOn(IsAdminBehaviorSetService.prototype, 'changeBoolean')
        };
        titleBehaviorSetServiceStub = {
            currentMessage: new Subject(),
            changeMessage: spyOn(TitleBehaviorSetService.prototype, 'changeMessage')
        };

    
    })

    it('should create', () => {
        component = new AdminLoginComponent(
            <any>adminLoginServiceStub,
            <any>isAdminBehaviorSetServiceStub,
            <any>titleBehaviorSetServiceStub,
            <any>adminLoginRouterStub
        );
        expect(component).toBeTruthy();
    });

    it('should set justRegistered to true on init'
        + ' if the admin has just registered', () => {
            component = new AdminLoginComponent(
                <any>adminLoginServiceStub,
                <any>isAdminBehaviorSetServiceStub,
                <any>titleBehaviorSetServiceStub,
                <any>adminLoginRouterStub
            );
            let getItem = spyOn(sessionStorage, 'getItem');
            let setItem = spyOn(sessionStorage, 'setItem');

            getItem.and.returnValue('yes');
            component.ngOnInit();

            expect(component.justRegistered).toBeTruthy();
            expect(setItem).toHaveBeenCalledWith('justRegistered', 'no');
        });

    it('should set justRegistered to false on init'
        + ' if the admin has just registered', () => {
            component = new AdminLoginComponent(
                <any>adminLoginServiceStub,
                <any>isAdminBehaviorSetServiceStub,
                <any>titleBehaviorSetServiceStub,
                <any>adminLoginRouterStub
            );
            let getItem = spyOn(sessionStorage, 'getItem');
            let setItem = spyOn(sessionStorage, 'setItem');

            getItem.and.returnValue('');
            component.ngOnInit();

            expect(component.justRegistered).toBeFalsy();
            expect(setItem).toHaveBeenCalledWith('justRegistered', 'no');
        });

    describe('onSubmitClick', () => {
        it('should call runLoginEvents if admin object'
            + ' is successfully returned by the server', () => {
                component = new AdminLoginComponent(
                    <any>adminLoginServiceStub,
                    <any>isAdminBehaviorSetServiceStub,
                    <any>titleBehaviorSetServiceStub,
                    <any>adminLoginRouterStub
                );

                let runLogin = spyOn(AdminLoginComponent.prototype, 'runLoginEvents');
                let fakeSubject = new Subject<Admin>(); // makes container to put admin "reponse" in
                let fakeAdmin = new Admin();

                adminLoginServiceStub.validateUser.and.returnValue(fakeSubject);
                component.onSubmitClick();
                fakeSubject.next(fakeAdmin); // fills fakeSubject container with component.admin
                expect(runLogin).toHaveBeenCalled();
            });

        it('should produce an error if an'
            + ' error happens in the server', () => {
                component = new AdminLoginComponent(
                    <any>adminLoginServiceStub,
                    <any>isAdminBehaviorSetServiceStub,
                    <any>titleBehaviorSetServiceStub,
                    <any>adminLoginRouterStub
                );

                let fakeSubject = new Subject<Admin>();

                adminLoginServiceStub.validateUser.and.returnValue(fakeSubject);
                component.onSubmitClick();
                fakeSubject.error(new Error());
                expect(component.errorMessage).toBeDefined();
            });

    });

    describe('runLoginEvents', () => {
        it('should call changeBoolean', () => {
            component = new AdminLoginComponent(
                <any>adminLoginServiceStub,
                <any>isAdminBehaviorSetServiceStub,
                <any>titleBehaviorSetServiceStub,
                <any>adminLoginRouterStub
            );
            
            component.admin = new Admin();
            component.runLoginEvents();
            expect(isAdminBehaviorSetServiceStub.changeBoolean).toHaveBeenCalled();
        });

        it('set admin to JSON.stringify(this.admin)' +
            'when runLoginEvents() is called', () => {
                component = new AdminLoginComponent(
                    <any>adminLoginServiceStub,
                    <any>isAdminBehaviorSetServiceStub,
                    <any>titleBehaviorSetServiceStub,
                    <any>adminLoginRouterStub
                );
                let setItem = spyOn(sessionStorage, 'setItem');
                
                component.admin = new Admin();
                component.runLoginEvents();
                expect(setItem).toHaveBeenCalledWith('admin', JSON.stringify(component.admin));
            })

        it('should call changeMessage', () => {
            component = new AdminLoginComponent(
                <any>adminLoginServiceStub,
                <any>isAdminBehaviorSetServiceStub,
                <any>titleBehaviorSetServiceStub,
                <any>adminLoginRouterStub
            );

            component.admin = new Admin();
            component.runLoginEvents();
            expect(titleBehaviorSetServiceStub.changeMessage).toHaveBeenCalled();
        });


    });
});
