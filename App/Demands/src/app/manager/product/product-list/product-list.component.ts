import { Component, ViewChild, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProductService } from '../Services/product.service';
import { ProductDetailsDialog } from '../product-details-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  products: IProduct[]

  displayedColumns: string[] = ['Id', 'Name', 'Price', 'Stock', 'Category', 'Actions'];
  dataSource: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products =>{
      console.log(products)
      this.dataSource = new MatTableDataSource<IProduct>(products);
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

  getProductDetails(product) {
    this.dialog.open(ProductDetailsDialog, {
      data: product
    });
  }

  deleteProduct(product) {
    console.log('delete this product: ', product)
  }

  beforeDelete(product) {
    this.deleteSwal.update({
      html: `<p>Do you really wanna delete the product: <b>${product.Name}</b>?</p>`
    });
  }
}
