import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Observable } from 'rxjs';
import { ITour } from '../../models/tours';
import { BasketService } from '../../services/basket.service';


@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, OverlayBadgeModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',  
  // encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit, OnDestroy{
dateTime: Date;
menuItems: MenuItem[] = [];
user: IUser;
logoutIcon = 'pi pi-user';
basketStore$: Observable<ITour[]> = null;

  constructor(private userService: UserService, private router: Router, private basketService: BasketService) {}


  ngOnInit(): void {
    this.basketStore$ = this.basketService.basketStore$;
    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();

  setInterval(()=>{
    this.dateTime = new Date();
  }, 1000);
}

ngOnDestroy(): void {
  
}
initMenuItems(): MenuItem[] {
  return [
    {
      label: 'Билеты',
      routerLink: ['/tours'],
    },
    {
      label: 'Настройки',
      routerLink: ['./settings'],
    },
    {
      label: 'Заказы',
      routerLink: ['/orders'],
      
    },

  ];
}
logOut(): void {
  this.userService.setUser(null);
  this.router.navigate(['/auth']);
}

hoverLogoutBtn(val: boolean): void {
  this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
}
goToBasket(): void {
  this.router.navigate(['/basket']); // метод для перехода к компоненту корзины
}

}