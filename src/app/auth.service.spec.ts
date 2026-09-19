import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookies: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookies = jasmine.createSpyObj<CookieService>(
      'CookieService',
      ['check', 'set', 'delete']
    );

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: cookies }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should report the authentication state from the session cookie', () => {
    cookies.check.and.returnValue(false);
    expect(service.isAuthenticated()).toBeFalse();

    cookies.check.and.returnValue(true);
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should sign in by creating the session cookie', () => {
    service.signin('Aria');

    expect(cookies.set).toHaveBeenCalledWith(
      'rpg-auth-session',
      'Aria',
      { path: '/', sameSite: 'Lax' }
    );
  });

  it('should sign out by deleting the session cookie', () => {
    service.signout();

    expect(cookies.delete).toHaveBeenCalledWith(
      'rpg-auth-session',
      '/'
    );
  });
});

