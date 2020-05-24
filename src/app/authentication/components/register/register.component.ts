import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { take } from 'rxjs/operators';

const MIN_PASSWORD_LENGTH = 6;

@Component({
  selector: 'pindrop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  serverMessage: string = '';
  form: FormGroup;
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      nickname: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]),
      passwordConfirmation: this.fb.control('', [this.passwordConfirmationValidator()]),
    });
  }

  passwordConfirmationValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value !== this.form?.get('password').value
        ? { passwordsNotMatch: 'Passwords are not matching' }
        : null;
    };
  }

  onSubmit() {
    this.usersService
      .registerUser(this.form.value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.serverMessage = 'Activation email was sent. Please check your inbox';
        },
        ({ error }) => {
          this.serverMessage = error.message;
        },
      );
  }
}
