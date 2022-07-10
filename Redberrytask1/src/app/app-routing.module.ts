import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { RegistrationComponent } from './features/registration/registration.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: 'landing', component: LandingComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
