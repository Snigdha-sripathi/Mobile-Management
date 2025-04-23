import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
export const appRoutes: Routes = [
  { path: '', component: AppComponent }, // This will display the list of mobiles
  { path: 'edit/:id', component: AppComponent }, // Edit a mobile using ID
];
