import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly signinForm = new FormGroup<{
    username: FormControl<string>;
    accessCode: FormControl<string>;
  }>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),

    accessCode: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{6}$/)
      ]
    })
  });

  get username(): FormControl<string> {
    return this.signinForm.controls.username;
  }

  get accessCode(): FormControl<string> {
    return this.signinForm.controls.accessCode;
  }

  submit(): void {
    this.signinForm.markAllAsTouched();

    if (this.signinForm.invalid) {
      return;
    }

    this.authService.signin(this.username.value);

    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/builder';

    this.router.navigateByUrl(returnUrl);
  }
}
