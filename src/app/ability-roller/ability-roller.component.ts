import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section
      class="w4-container w4-section"
      aria-labelledby="roller-heading">

      <div class="w4-grid w4-grid-split">

        <div>

          <p class="w4-eyebrow">
            ABILITY ROLLER
          </p>

          <h1 id="roller-heading">
            Roll an Ability Score
          </h1>

          <p class="w4-page-intro">
            Generate a random ability score using the selected die.
            The route controls the number of sides.
          </p>

          <div class="w4-actions">

            <a
              routerLink="/builder"
              class="w4-btn w4-btn-primary">
              Continue to Character Builder
            </a>

            <a
              routerLink="/classes"
              class="w4-link-arrow">
              Browse Classes →
            </a>

          </div>

        </div>

        <div class="w4-panel w4-text-center">

          <p class="w4-kicker">
            CURRENT DIE
          </p>

          <div class="w4-badge">
            d{{ sides }}
          </div>

          <div
            class="w4-roll-result"
            data-testid="roll-result"
            aria-live="polite">

            <strong class="w4-roll-value">
              {{ result }}
            </strong>

          </div>

          <button
            type="button"
            class="w4-btn w4-btn-primary"
            data-testid="roll-button"
            (click)="rollAbility()">

            Roll Ability

          </button>

          <p class="w4-field-hint">
            The result is always between 1 and {{ sides }}.
          </p>

        </div>

      </div>

    </section>
  `,
  styles: []
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  sides = 6;
  result = 0;

  constructor() {
    const routeSides = Number(
      this.route.snapshot.paramMap.get('sides')
    );

    if (
      Number.isInteger(routeSides) &&
      routeSides >= 2
    ) {
      this.sides = routeSides;
    } else {
      console.warn(
        'Invalid die sides; defaulting to 6.'
      );
    }
  }

  rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}
