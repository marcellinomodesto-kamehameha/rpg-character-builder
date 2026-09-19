import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  CharacterProfile,
  ProfileOption
} from '../models/character-profile';

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character-profile.html'
})
export class CharacterProfileComponent {
  alignments: ProfileOption[] = [
    { id: 'lawful-good', label: 'Lawful Good' },
    { id: 'neutral-good', label: 'Neutral Good' },
    { id: 'chaotic-good', label: 'Chaotic Good' }
  ];

  skills: ProfileOption[] = [
    { id: 'arcana', label: 'Arcana' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'survival', label: 'Survival' },
    { id: 'stealth', label: 'Stealth' }
  ];

  homelands: ProfileOption[] = [
    { id: 'northreach', label: 'Northreach' },
    { id: 'silver-coast', label: 'Silver Coast' },
    { id: 'ironvale', label: 'Ironvale' }
  ];

  profileForm = new FormGroup({
    backstory: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    alignment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    skillOptions: new FormArray(
      this.skills.map(() => new FormControl(false, { nonNullable: true }))
    ),

    homeland: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  profiles: CharacterProfile[] = [];

  get skillOptions(): FormArray<FormControl<boolean>> {
    return this.profileForm.controls.skillOptions;
  }

  get hasSelectedSkill(): boolean {
    return this.skillOptions.controls.some(control => control.value);
  }

  get formIsValid(): boolean {
    return this.profileForm.valid && this.hasSelectedSkill;
  }

  onSubmit(): void {
    if (!this.formIsValid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const selectedSkills = this.skills
      .filter((_, index) => this.skillOptions.at(index).value)
      .map(skill => skill.id);

    const profile: CharacterProfile = {
      backstory: this.profileForm.controls.backstory.value,
      alignment: this.profileForm.controls.alignment.value,
      skills: selectedSkills,
      homeland: this.profileForm.controls.homeland.value
    };

    this.profiles.push(profile);

    this.profileForm.reset();

    this.skillOptions.controls.forEach(control => {
      control.setValue(false);
    });
  }
}
