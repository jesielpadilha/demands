import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/manager/product/Services/product.service';
import { IProduct } from 'src/app/models/product.model';
import { IProductOrder } from 'src/app/models/product-order.model';
import { IIngredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.sass']
})
export class OrderCreateComponent implements OnInit {

  @Output() cancelOrder = new EventEmitter()
  products: IProductOrder[]
  productFilter: string
  private allProducts: IProductOrder[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.productService.getProducts().forEach((product: IProduct) => {
    //   this.allProducts.push({
    //     product: product,
    //     amount: 0,
    //     ingredientsAdded: product.ingredients ? product.ingredients : [] ,
    //     ingredientsRemoved: []
    //   })
    // })
    this.productService.getProducts().subscribe(products => {
      products.forEach((product: IProduct) => {
        this.allProducts.push({
          product: product,
          amount: 0,
          ingredientsAdded: [],
          ingredientsRemoved: []
        })
      })
      this.products = this.allProducts
    })
  }

  filter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      this.products = this.products.filter((item: IProductOrder) => {
        return item.product.name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
          item.product.description.trim().toLowerCase().includes(filterValue.trim().toLowerCase());
      });
    } else {
      this.products = this.allProducts
    }
  }

  addItem(po: IProductOrder) {
    po.amount++
  }

  removeItem(po: IProductOrder) {
    if (po.amount > 0)
      po.amount--
  }

  getTotalOrder() {
    return this.products.length > 0
      ? this.products.map(p => p.product.price * p.amount).reduce((a, b) => a + b)
      : 0
  }

  changeIngredient(po: IProductOrder, ingredient: IIngredient) {
    let index = po.ingredientsAdded.findIndex(i => i.id === ingredient.id)
    if (index != -1) {
      po.ingredientsAdded[index].checked = !po.ingredientsAdded[index].checked
    }
    po.ingredientsRemoved = po.ingredientsAdded.filter(i => !i.checked)
  }

  save() {
    let productsToSave = this.products.filter(p => p.amount > 0);
    if(productsToSave.length > 0){
      console.log(this.products.filter(p => p.amount > 0))
    }else{
      alert('Select some product')
    }
  }

  cancel(){
    console.log('cancel order')
    this.cancelOrder.emit()
  }
}
