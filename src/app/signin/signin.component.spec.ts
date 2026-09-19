import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  Router
} from '@angular/router';
import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['signin']);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reject invalid and accept valid form states', () => {
    component.signinForm.setValue({
      username: 'Al',
      accessCode: 'A7B9C2'
    });

    expect(component.signinForm.invalid).toBeTrue();

    component.signinForm.setValue({
      username: 'Aria',
      accessCode: 'A7B9C2'
    });

    expect(component.signinForm.valid).toBeTrue();
  });

 it('should display validation feedback only after interaction', () => {
  const fixture = TestBed.createComponent(SigninComponent);
  const component = fixture.componentInstance;

  fixture.detectChanges();

  const usernameInput =
    fixture.nativeElement.querySelector('#username') as HTMLInputElement;

  const accessCodeInput =
    fixture.nativeElement.querySelector('#access-code') as HTMLInputElement;

  // Errors should not appear before interaction.
  expect(
    fixture.nativeElement.querySelector('#username-error')
  ).toBeNull();

  expect(
    fixture.nativeElement.querySelector('#access-code-error')
  ).toBeNull();

  // Interact with both controls.
  usernameInput.dispatchEvent(new Event('blur'));
  accessCodeInput.dispatchEvent(new Event('blur'));

  // Explicitly mark the controls as touched.
  component.username.markAsTouched();
  component.accessCode.markAsTouched();

  fixture.detectChanges();

  // Errors should now be visible.
  expect(
    fixture.nativeElement.querySelector('#username-error')
  ).not.toBeNull();

  expect(
    fixture.nativeElement.querySelector('#access-code-error')
  ).not.toBeNull();
});

  it('should sign in and navigate to the builder route', () => {
    component.signinForm.setValue({
      username: 'Aria',
      accessCode: 'A7B9C2'
    });

    component.submit();

    expect(auth.signin).toHaveBeenCalledWith('Aria');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/builder');
  });
});

