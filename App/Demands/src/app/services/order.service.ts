import { Injectable } from '@angular/core';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getById(id: number): IOrder {
    return null
  }

  getOrdersByTableId(id: number): IOrder[] {
    return []
  }
}