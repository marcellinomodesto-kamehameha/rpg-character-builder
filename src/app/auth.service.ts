import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly cookieService = inject(CookieService);
  private readonly sessionCookie = 'rpg-auth-session';

  isAuthenticated(): boolean {
    return this.cookieService.check(this.sessionCookie);
  }

  signin(username: string): void {
    this.cookieService.set(this.sessionCookie, username, {
      path: '/',
      sameSite: 'Lax'
    });
  }

  signout(): void {
    this.cookieService.delete(this.sessionCookie, '/');
  }
}
