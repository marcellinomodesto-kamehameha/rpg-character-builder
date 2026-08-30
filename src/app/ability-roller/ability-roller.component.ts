import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  template: `
    <section class="roller-page">
      <div class="roller-card">
        <div class="roller-header">
          <h1>Ability Score Roller</h1>
          <p>Roll the dice to generate an ability score.</p>
        </div>

        <div class="die-display">
          <span class="die-label">Die</span>
          <strong>d{{ sides }}</strong>
        </div>

        <div class="result-box" data-testid="roll-result">
          {{ result }}
        </div>

        <button
          type="button"
          class="roll-button"
          data-testid="roll-button"
          (click)="rollAbility()">
          Roll Ability
        </button>

        <p class="roller-help">
          The result is always between 1 and {{ sides }}.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .roller-page {
      min-height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 1rem;
    }

    .roller-card {
      width: 100%;
      max-width: 520px;
      padding: 2.5rem;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      text-align: center;
    }

    .roller-header h1 {
      margin: 0 0 0.5rem;
      font-size: 2rem;
      color: #111827;
    }

    .roller-header p {
      margin: 0 0 2rem;
      color: #6b7280;
    }

    .die-display {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .die-label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .die-display strong {
      font-size: 1.5rem;
    }

    .result-box {
      width: 140px;
      height: 140px;
      margin: 0 auto 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 3px solid #374151;
      border-radius: 12px;
      background: #f9fafb;
      color: #111827;
      font-size: 4rem;
      font-weight: bold;
    }

    .roll-button {
      padding: 0.85rem 2rem;
      border: none;
      border-radius: 8px;
      background: #374151;
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.15s ease, background-color 0.15s ease;
    }

    .roll-button:hover {
      background: #111827;
      transform: translateY(-2px);
    }

    .roll-button:active {
      transform: translateY(0);
    }

    .roller-help {
      margin: 1.5rem 0 0;
      color: #6b7280;
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      .roller-page {
        padding: 1rem;
      }

      .roller-card {
        padding: 2rem 1.25rem;
      }

      .roller-header h1 {
        font-size: 1.6rem;
      }

      .result-box {
        width: 120px;
        height: 120px;
        font-size: 3.25rem;
      }
    }
  `]
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  sides = 6;
  result = 0;

  constructor() {
    const routeSides = Number(this.route.snapshot.paramMap.get('sides'));

    if (Number.isInteger(routeSides) && routeSides >= 2) {
      this.sides = routeSides;
    } else {
      console.warn('Invalid die sides; defaulting to 6.');
    }
  }

  rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}
