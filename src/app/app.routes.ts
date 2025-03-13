import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    { path: '',   redirectTo: '/auth', pathMatch: 'full' }, // redirect to `auth`
    { path: 'tickets', component: LayoutComponent},
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  // Wildcard route for a 404 page
];
