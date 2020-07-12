import { Component, ViewChild, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: IProduct[]

  displayedColumns: string[] = ['Id', 'Name', 'Price', 'Stock', 'Category', 'Actions'];

  dataSource: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('swalEntity') private swalEntity: SwalComponent;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getAll().subscribe(items => {
      this.dataSource = new MatTableDataSource<IProduct>(items);
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
    this.productService.getById(item.id).subscribe(res => {
      this.swalEntity.update({
        title: 'Item Details',
        html: this.getDetailsTemplate(res),
        icon: null,
        toast: false,
        position: 'center',
        timer: 0
      })
      this.swalEntity.fire()
    })
  }

  delete(item) {
    this.productService.delete(item.id).subscribe(res => {
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
      html: `<p>Do you really wanna delete the product: <b>${item.name}</b>?</p>`
    });
  }

  getDetailsTemplate(item: IProduct): string {
    let ingredients: string;
    if (item.productsIngredients !== null && item.productsIngredients.length > 0) {
      ingredients = item.productsIngredients.map(p => p.ingredient.name).join(', ');
    } else {
      ingredients = '--'
    }
    return `
     <table>
        <tr>
          <th>Name</th>
          <td>${item.name}</td>
        </tr> 
        <tr>
          <th>Description</th>
          <td>${item.description}</td>
        </tr> 
        <tr>
          <th>Price</th>
          <td>${item.price}</td>
        </tr>
        <tr>
          <th>Stock</th>
          <td>${item.stock}</td>
        </tr>
        <tr>
          <th>Category</th>
          <td>${item?.category.name}</td>
        </tr>
        <tr>
          <th>Ingredients</th>
          <td>${ingredients}</td>
        </tr>
      </tr>
     </table>
    `
  }
}

// Name: ${item.name} <br/>
// Price: ${item.price} <br/>
// Stock: ${item.stock} <br/>
// Category: ${item?.category.name} <br/>
// Ingredients: ${ingredients} <br/>
