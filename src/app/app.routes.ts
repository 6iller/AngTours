import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { authGuard } from './shared/guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { PasswordChangeComponent } from './pages/settings/settings/password-change/password-change.component';
import { StatisticComponent } from './pages/settings/settings/statistic/statistic/statistic.component';
import { OrderComponent } from './pages/order/order/order.component';
import { BasketComponent } from './pages/basket/basket/basket.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';

export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    // {path: 'basket', component: BasketComponent}, для доступа к корзине вне авторизации
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
            {path: 'order/:id', component: OrderComponent},
            
        ]
    },
    {
        path: 'orders', 
        canActivate: [authGuard],
        component: OrdersComponent
      },
    // доступ к корзине только после авторизации
    {
        path: 'basket',
        canActivate: [authGuard], 
        component: BasketComponent
    },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  // Wildcard route for a 404 page
];
