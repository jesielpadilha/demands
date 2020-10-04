import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IngredientService } from '../services/ingredient.service';
import { MatTableDataSource } from '@angular/material/table';
import { IIngredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Actions'];

  dataSource: MatTableDataSource<IIngredient>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('swalEntity') private swalEntity: SwalComponent;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ingredientService.getAll().subscribe(items => {
      this.dataSource = new MatTableDataSource<IIngredient>(items);
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
    this.ingredientService.getById(item.id).subscribe(res => {
      console.log(res);
    })
    this.swalEntity.update({
      title: 'Item Details',
      html: `Name: ${item.name}`,
      icon: null,
      toast: false,
      position: 'center',
      timer: 0
    })
    this.swalEntity.fire()
  }

  delete(item) {
    this.ingredientService.delete(item.id).subscribe(res => {
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
      html: `<p>Do you really wanna delete the ingredient: <b>${item.name}</b>?</p>`
    });
  }
}
