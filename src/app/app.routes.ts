import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { authGuard } from './shared/guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { PasswordChangeComponent } from './pages/settings/settings/password-change/password-change.component';
import { StatisticComponent } from './pages/settings/settings/statistic/statistic/statistic.component';


export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    { path: '',   redirectTo: '/auth', pathMatch: 'full' }, // redirect to `auth`
    { path: 'tours', 
        canActivate: [authGuard],
        component: LayoutComponent,
        children: [
            {path: '', component: ToursComponent, data: {showAside:true}},
            {path: 'tour', redirectTo: '', pathMatch: 'full'},
            {path: 'tour/:id', component: TourItemComponent},
            {
                path: 'settings',
                canActivate: [authGuard],
                component: SettingsComponent,
                children: [
                    { path: '', redirectTo: 'statistic', pathMatch: 'full' },
                    { path: 'statistic', component: StatisticComponent, data: {showAside:true}},
                    { path: 'password-change', component: PasswordChangeComponent },
                ]
            },
        ]
    },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  // Wildcard route for a 404 page
];
