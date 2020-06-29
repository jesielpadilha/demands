import { Component, OnInit, Output } from "@angular/core";
import { ITable } from 'src/app/models/table.model';
import { TableService } from 'src/app/services/table.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.sass']
})
export class TableDetailsComponent implements OnInit{
  
  table: ITable
  ordersTable: IOrder[]
  isNewOrder: boolean = false

  constructor(private tableService: TableService, private router: ActivatedRoute,
     private orderService: OrderService){}

  ngOnInit(): void {
    let tableFound = this.tableService.getById(this.router.snapshot.params.id)
    if(tableFound)
      this.table = tableFound
  }

  cancelNewOrder(){
    this.isNewOrder = false
  }
}