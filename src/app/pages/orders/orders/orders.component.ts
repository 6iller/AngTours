import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../../services/orders.service';
import { ITour } from '../../../models/tours';
import { TableModule } from 'primeng/table';
import { IOrder } from '../../../models/orders';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, ButtonModule, RouterModule], //RouterLink, TableModule
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
 

}
// export class OrdersComponent implements OnInit {
//   orders: ITour[] = [];


//   constructor(private ordersService: OrdersService) {}

//   ngOnInit() {
//     this.ordersService.getOrders().subscribe(orders => {
//         this.orders = orders
//     });
//   }

// }