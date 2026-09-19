import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="w4-shell">

      <a class="w4-skip-link" href="#main-content">
        Skip to main content
      </a>

      <header class="w4-header">
        <div class="w4-header-inner">

          <div class="w4-brand">
            <span class="w4-brand-kicker">
              FANTASY CHARACTER TOOLS
            </span>

            <span class="w4-brand-title">
              RPG Character Builder
            </span>
          </div>

          <div class="w4-account">
            <span class="w4-account-label">
              ADVENTURE READY
            </span>

            <span class="w4-account-text">
              Build your next character
            </span>

            <a
              class="w4-btn w4-btn-primary"
              routerLink="/signin"
            >
              Sign In
            </a>
          </div>

        </div>

        <nav
          class="w4-navbar"
          aria-label="Main navigation"
        >
          <div class="w4-nav">

            <a
              class="w4-nav-link"
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              Home
            </a>

            <a
              class="w4-nav-link"
              routerLink="/classes"
              routerLinkActive="active"
            >
              Classes
            </a>

            <a
              class="w4-nav-link"
              routerLink="/roll/6"
              routerLinkActive="active"
            >
              Ability Roller
            </a>

            <a
              class="w4-nav-link"
              routerLink="/builder"
              routerLinkActive="active"
            >
              Character Builder
            </a>

            <a
              class="w4-nav-link"
              routerLink="/profile"
              routerLinkActive="active"
            >
              Profile
            </a>

            <a
              class="w4-nav-link"
              routerLink="/about"
              routerLinkActive="active"
            >
              About
            </a>

          </div>
        </nav>
      </header>

      <main
        id="main-content"
        class="w4-main"
      >
        <router-outlet></router-outlet>
      </main>

      <footer class="w4-footer">
        <div class="w4-footer-inner">
          <span>WEB 425 · RPG Character Builder</span>

          <nav
            class="w4-footer-nav"
            aria-label="Footer navigation"
          >
            <a routerLink="/about">About</a>
            <a routerLink="/classes">Classes</a>
          </nav>
        </div>
      </footer>

    </div>
  `
})
export class AppComponent {}
