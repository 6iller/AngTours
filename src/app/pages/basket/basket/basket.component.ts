import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasketService } from '../../../services/basket.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe, ButtonModule, DatePipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent { 
  basketItems$ = inject(BasketService).basketStore$;
  constructor(private basketService: BasketService) {}
  
removeFromBasket(tour: any) { // Метод для удаления из корзины
    this.basketService.removeItemFromBasket(tour);
  }

}


