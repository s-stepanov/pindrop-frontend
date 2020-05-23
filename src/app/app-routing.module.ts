import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRootComponent } from './authentication/components/auth-root/auth-root.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: AuthRootComponent },
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
