import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Character } from '../models/character';

@Component({
  selector: 'app-character-builder',
  imports: [FormsModule],
  template: `
    <section>
      <h1>Create a Character</h1>

      <form
        id="character-form"
        data-testid="character-form"
        #characterForm="ngForm"
        (ngSubmit)="addCharacter(characterForm)">

        <div>
          <label for="character-name">Name</label>
          <input
            id="character-name"
            data-testid="character-name"
            name="characterName"
            type="text"
            [(ngModel)]="character.name"
            required>
        </div>

        <div>
          <label for="character-class">Class</label>
          <select
            id="character-class"
            data-testid="character-class"
            name="characterClass"
            [(ngModel)]="character.characterClass"
            required>
            <option value="">Select a class</option>
            <option value="Fighter">Fighter</option>
            <option value="Wizard">Wizard</option>
            <option value="Archer">Archer</option>
          </select>
        </div>

        <div>
          <label for="character-level">Level</label>
          <input
            id="character-level"
            data-testid="character-level"
            name="characterLevel"
            type="number"
            [(ngModel)]="character.level"
            min="1"
            max="20"
            step="1"
            required>
        </div>

        <div>
          <label for="character-veteran">Veteran</label>
          <input
            id="character-veteran"
            data-testid="character-veteran"
            name="veteran"
            type="checkbox"
            [(ngModel)]="character.veteran">
        </div>

        <button
          id="character-submit"
          data-testid="character-submit"
          type="submit"
          [disabled]="characterForm.invalid">
          Create Character
        </button>
      </form>

      <section
        id="character-list"
        data-testid="character-list">

        <h2>Created Characters</h2>

        @for (character of characters; track $index) {
          <article>
            <h3>{{ character.name }}</h3>
            <p>
              {{ character.characterClass }} ·
              Level {{ character.level }}
            </p>
            <p>
              Starting hit points:
              {{ character.startingHitPoints }}
            </p>
            <p>
              Veteran:
              {{ character.veteran ? 'Yes' : 'No' }}
            </p>
          </article>
        }
      </section>
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
