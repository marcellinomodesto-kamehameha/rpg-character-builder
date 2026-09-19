import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Character } from '../models/character';

@Component({
  selector: 'app-character-builder',
  imports: [FormsModule],
  template: `
    <section
      class="w4-container w4-section"
      aria-labelledby="builder-heading">

      <div class="w4-heading-split">

        <div>

          <p class="w4-eyebrow">
            CHARACTER BUILDER
          </p>

          <h1 id="builder-heading">
            Create a Character
          </h1>

        </div>

        <p>
          Give your adventurer a name, choose a class, and
          select a starting level.
        </p>

      </div>

      <div class="w4-grid w4-grid-split">

        <form
          id="character-form"
          data-testid="character-form"
          class="w4-panel w4-form"
          #characterForm="ngForm"
          (ngSubmit)="addCharacter(characterForm)">

          <div class="w4-section-heading">

            <div class="w4-icon-circle">
              01
            </div>

            <div>

              <h2>
                Character Details
              </h2>

              <p>
                Start with the basics
              </p>

            </div>

          </div>

          <div class="w4-field">

            <label for="character-name">
              Name
            </label>

            <input
              id="character-name"
              data-testid="character-name"
              name="characterName"
              type="text"
              class="w4-control"
              [(ngModel)]="character.name"
              required>

          </div>

          <div class="w4-field">

            <label for="character-class">
              Class
            </label>

            <select
              id="character-class"
              data-testid="character-class"
              name="characterClass"
              class="w4-control"
              [(ngModel)]="character.characterClass"
              required>

              <option value="">
                Select a class
              </option>

              <option value="Fighter">
                Fighter
              </option>

              <option value="Wizard">
                Wizard
              </option>

              <option value="Archer">
                Archer
              </option>

            </select>

          </div>

          <div class="w4-field w4-field-narrow">

            <label for="character-level">
              Level
            </label>

            <input
              id="character-level"
              data-testid="character-level"
              name="characterLevel"
              type="number"
              class="w4-control"
              [(ngModel)]="character.level"
              min="1"
              max="20"
              step="1"
              required>

            <p class="w4-field-hint">
              Choose a starting level from 1 through 20.
            </p>

          </div>

          <label
            class="w4-choice-card"
            for="character-veteran">

            <input
              id="character-veteran"
              data-testid="character-veteran"
              name="veteran"
              type="checkbox"
              [(ngModel)]="character.veteran">

            <span>

              <strong>
                Veteran character
              </strong>

              <small>
                Mark this character as a seasoned adventurer.
              </small>

            </span>

          </label>

          <div class="w4-actions w4-mt-4">

            <button
              id="character-submit"
              data-testid="character-submit"
              class="w4-btn w4-btn-primary"
              type="submit"
              [disabled]="characterForm.invalid">

              Create Character

            </button>

          </div>

        </form>

        <section
          id="character-list"
          data-testid="character-list"
          class="w4-panel">

          <div class="w4-section-heading">

            <div class="w4-icon-circle">
              02
            </div>

            <div>

              <h2>
                Created Characters
              </h2>

              <p>
                Your characters appear here
              </p>

            </div>

          </div>

          @if (characters.length === 0) {

            <div class="w4-empty-state">

              <div class="w4-empty-icon">
                +
              </div>

              <h3>
                No characters yet
              </h3>

              <p>
                Complete the form to create your first character.
              </p>

            </div>

          } @else {

            <div class="w4-stack">

              @for (
                character of characters;
                track $index
              ) {

                <article class="w4-review-card">

                  <div class="w4-item-heading">

                    <strong>
                      {{ character.name }}
                    </strong>

                    <span class="w4-badge">
                      {{ character.characterClass }}
                    </span>

                  </div>

                  <div class="w4-detail-list">

                    <p>
                      <span>Level</span>
                      <strong>{{ character.level }}</strong>
                    </p>

                    <p>
                      <span>Starting Hit Points</span>
                      <strong>
                        {{ character.startingHitPoints }}
                      </strong>
                    </p>

                    <p>
                      <span>Veteran</span>
                      <strong>
                        {{ character.veteran ? 'Yes' : 'No' }}
                      </strong>
                    </p>

                  </div>

                </article>

              }

            </div>

          }

        </section>

      </div>

    </section>
  `
})
export class CharacterBuilderComponent {
  public character: Character = {
    name: '',
    characterClass: '',
    level: 1,
    veteran: false,
    startingHitPoints: 11
  };

  public characters: Character[] = [];

  public addCharacter(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const newCharacter: Character = {
      name: this.character.name,
      characterClass: this.character.characterClass,
      level: this.character.level,
      veteran: this.character.veteran,
      startingHitPoints: 10 + this.character.level
    };

    this.characters.push(newCharacter);

    this.character = {
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    };

    form.resetForm(this.character);
  }
}
