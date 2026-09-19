import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter
} from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let auth: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    auth = jasmine.createSpyObj<AuthService>(
      'AuthService',
      ['isAuthenticated']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: auth },
        provideRouter([])
      ]
    });

    router = TestBed.inject(Router);
  });

  it('should allow authenticated users', () => {
    auth.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(result).toBeTrue();
  });

  it('should redirect unauthenticated users and preserve the requested URL', () => {
    auth.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(router.serializeUrl(result as UrlTree))
      .toBe('/signin?returnUrl=%2Fbuilder');
  });
});
