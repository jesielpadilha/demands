import { Component, ViewChild } from '@angular/core';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { MatTableDataSource } from '@angular/material/table';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CategoryService } from '../services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent{

  displayedColumns: string[] = ['Id', 'Name', 'Actions'];

  dataSource: MatTableDataSource<ICategoryProduct>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('swalEntity') private swalEntity: SwalComponent;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();    
  }

  loadData(){
    this.categoryService.getAll().subscribe(items =>{
      this.dataSource = new MatTableDataSource<ICategoryProduct>(items);
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
    this.categoryService.getById(item.id).subscribe(res =>{
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
    this.categoryService.delete(item.id).subscribe(res =>{
      if(res){
        this.loadData()
        this.swalEntity.update({
          title: 'Item deleted successfully',
        })
        this.swalEntity.fire()
      }else{
        this.swalEntity.update({
          title: 'Fail to delete',
          icon: 'error'
        })
      }
    }) 
  }

  beforeDelete(item) {
    this.deleteSwal.update({
      html: `<p>Do you really wanna delete the category: <b>${item.name}</b>?</p>`
    });
  }  
}