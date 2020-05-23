import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pindrop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  serverResponse: string = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    this.authService.sendLoginRequest(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      (error) => {
        console.error(error);
        this.serverResponse = 'Wrong email or password';
      },
    );
  }
}
