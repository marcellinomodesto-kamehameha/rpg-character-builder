import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'classes-page',
  imports: [RouterLink],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class ClassesComponent {
  public characterClasses: CharacterClass[] = [
    {
      id: 'fighter',
      name: 'Fighter',
      description: 'A durable combat specialist suited to close-range encounters.'
    },
    {
      id: 'wizard',
      name: 'Wizard',
      description: 'A powerful spellcaster who specializes in arcane magic.'
    },
    {
      id: 'archer',
      name: 'Archer',
      description: 'A marksman trained in the art, sport, or combat skill of archery.'
    }
  ];
}


export { ClassesComponent as Classes };
