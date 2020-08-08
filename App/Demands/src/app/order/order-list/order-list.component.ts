import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  orders: IOrder[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAll().subscribe(res => {
      console.log('Order component: ', res)
      this.orders = res
    })
  }
}
