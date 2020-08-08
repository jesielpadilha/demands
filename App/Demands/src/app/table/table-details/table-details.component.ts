import { Component, OnInit } from "@angular/core";
import { ITable } from 'src/app/models/table.model';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/manager/table/services/table.service';
import { IProductOrder } from 'src/app/models/product-order.model';
import { ITrackOrder } from 'src/app/models/track-order.model';
import { StatusOrder } from 'src/app/models/status-order';

@Component({
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.sass']
})
export class TableDetailsComponent implements OnInit {

  table: ITable
  ordersTable: IOrder[] = []
  isNewOrder: boolean = false
  private statusOrder: StatusOrder

  constructor(private tableService: TableService, private router: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.statusOrder = new StatusOrder();
    
    this.tableService.getById(+this.router.snapshot.params.id).subscribe(res => {
      if (res) {
        this.table = res
        this.getOrdersTable(res.id);
      }
    })
  }

  changeBusyStatus(id: number){
    this.tableService.chnageBusyStatus(id).subscribe(res => {
      if (res) {
        this.table = res
      }
    })
  }

  getOrdersTable(tableId: number){
    this.orderService.getOrdersByTableId(tableId).subscribe(res => {
      console.log('component: ', res)
      this.ordersTable = res;
    })
  }

  cancelNewOrder() {
    this.isNewOrder = false 
  }
  
  orderFinished(){
      this.isNewOrder = false 
  }

  getTotalOrder(itemOrder: IProductOrder[]){
    return itemOrder.map(p => p.amount * p.product.price).reduce((a, b) => a + b, 0)
  }

  getOrderStatus(trackers: ITrackOrder[]){
   return this.statusOrder.getStatusList().filter((s: StatusOrder) => s.status == trackers[trackers.length - 1].status)[0].description;
  }
}