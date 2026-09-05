import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should support two-way binding for the character name', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('#character-name');

    input.value = 'Aria';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.character.name).toBe('Aria');
  });

  it('should not add a character when the form is invalid', () => {
    const form = {
      invalid: true,
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;

    component.addCharacter(form);

    expect(component.characters.length).toBe(0);
    expect(form.resetForm).not.toHaveBeenCalled();
  });

  it('should store a valid character and calculate starting hit points', () => {
    component.character = {
      name: 'Aria',
      characterClass: 'Wizard',
      level: 3,
      veteran: true,
      startingHitPoints: 11
    };

    const form = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;

    component.addCharacter(form);

    expect(component.characters.length).toBe(1);
    expect(component.characters[0]).toEqual({
      name: 'Aria',
      characterClass: 'Wizard',
      level: 3,
      veteran: true,
      startingHitPoints: 13
    });
  });

  it('should reset the form and model after a valid submission', () => {
    component.character = {
      name: 'Aria',
      characterClass: 'Wizard',
      level: 3,
      veteran: true,
      startingHitPoints: 13
    };

    const form = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;

    component.addCharacter(form);

    expect(form.resetForm).toHaveBeenCalled();
    expect(component.character.name).toBe('');
    expect(component.character.characterClass).toBe('');
    expect(component.character.level).toBe(1);
    expect(component.character.veteran).toBe(false);
  });
});
