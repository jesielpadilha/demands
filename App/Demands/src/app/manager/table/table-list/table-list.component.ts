import { Component, OnInit, ViewChild } from '@angular/core';
import { ITable } from 'src/app/models/table.model';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { TableService } from '../services/table.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html'
})
export class TableListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Number', 'IsBusy', 'Description', 'Actions'];

  dataSource: MatTableDataSource<ITable>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('swalEntity') private swalEntity: SwalComponent;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tableService.getAll().subscribe(items => {
      this.dataSource = new MatTableDataSource<ITable>(items);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(item) {
    this.tableService.getById(item.id).subscribe(res => {
      console.log(res);
    })
    this.swalEntity.update({
      title: 'Item Details',
      html: `
        Number: ${item.number} <br/>
        Is Busy?: ${item.isBusy ? 'Yes' : 'No'} <br/>
        Description: ${item.description ? item.description : '--'} <br/>
      `,
      icon: null,
      toast: false,
      position: 'center',
      timer: 0
    })
    this.swalEntity.fire()
  }

  delete(item) {
    this.tableService.delete(item.id).subscribe(res => {
      if (res) {
        this.loadData()
        this.swalEntity.update({
          title: 'Item deleted successfully',
        })
        this.swalEntity.fire()
      } else {
        this.swalEntity.update({
          title: 'Fail to delete',
          icon: 'error'
        })
      }
    })
  }

  beforeDelete(item) {
    this.deleteSwal.update({
      html: `<p>Do you really wanna delete the table: <b>${item.number}</b>?</p>`
    });
  }
}
