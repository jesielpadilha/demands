import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order.model';
import { ITrackOrder } from 'src/app/models/track-order.model';
import { StatusOrder } from 'src/app/models/status-order';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {

  orders: IOrder[] = [];
  private statusOrder: StatusOrder

  constructor(private orderService: OrderService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.statusOrder = new StatusOrder();

    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrderOpened().subscribe(res => {
      console.log('Order component: ', res)
      this.orders = res
    })
  }

  getOrderStatus(trackers: ITrackOrder[]) {
    return this.statusOrder.getStatusList().filter((s: StatusOrder) => s.status == trackers[trackers.length - 1].status)[0].description;
  }

  start(orderId: number) {
    this.setStatusOrder(orderId, 2)
  }

  ready(orderId: number) {
    this.setStatusOrder(orderId, 4)
  }

  cancel(orderId: number) {
    this.setStatusOrder(orderId, 6)
  }

  private setStatusOrder(orderId: number, status: number) {
    let newTrackStatus: ITrackOrder = {
      id: 0,
      status: status,
      orderId: orderId,
      userId: this.auth.getAuthenticatedUser().id,
      registrationDate: new Date()
    }
    this.orderService.setStatusOrder(newTrackStatus).subscribe(res => {
      console.log('Component', res);
      if (res) {
        this.getOrders()
      } else {
        alert('Fail update the status of the Order')
      }
    })
  }

  canStartOrder(trackers: ITrackOrder[]): boolean {
    return trackers[trackers.length - 1].status == 1
  }
  canSetAsReadyOrder(trackers: ITrackOrder[]): boolean {
    return trackers[trackers.length - 1].status == 2
  }
  canCancelOrder(trackers: ITrackOrder[]): boolean {
    return trackers[trackers.length - 1].status < 4;
  }
}
