import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  let component: CharacterProfileComponent;
  let fixture: ComponentFixture<CharacterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start in an invalid state', () => {
    expect(component.profileForm.valid).toBeFalse();
  });

  it('should become valid after required input and a skill are selected', () => {
    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.'
    );

    component.profileForm.controls.alignment.setValue('neutral-good');

    component.profileForm.controls.homeland.setValue('northreach');

    component.skillOptions.at(0).setValue(true);

    expect(component.formIsValid).toBeTrue();
  });

  it('should transform selected skill booleans into skill identifiers', () => {
    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.'
    );

    component.profileForm.controls.alignment.setValue('neutral-good');

    component.profileForm.controls.homeland.setValue('northreach');

    component.skillOptions.at(0).setValue(true);
    component.skillOptions.at(2).setValue(true);

    component.onSubmit();

    expect(component.profiles[0].skills).toEqual([
      'arcana',
      'survival'
    ]);
  });

  it('should render stored profile data', () => {
    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.'
    );

    component.profileForm.controls.alignment.setValue('neutral-good');

    component.profileForm.controls.homeland.setValue('northreach');

    component.skillOptions.at(0).setValue(true);
    component.skillOptions.at(2).setValue(true);

    component.onSubmit();

    fixture.detectChanges();

    const profileList = fixture.nativeElement.querySelector(
      '[data-testid="profile-list"]'
    );

    expect(profileList.textContent).toContain('northreach');
    expect(profileList.textContent).toContain('neutral-good');
    expect(profileList.textContent).toContain('arcana');
    expect(profileList.textContent).toContain('survival');
  });
});
