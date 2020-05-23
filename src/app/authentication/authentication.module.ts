import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthRootComponent } from './components/auth-root/auth-root.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, AuthRootComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
