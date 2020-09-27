import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/manager/product/Services/product.service';
import { IProductOrder } from 'src/app/models/product-order.model';
import { IIngredient } from 'src/app/models/ingredient.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order.model';
import { IProductOrderIngredient } from 'src/app/models/productOrderIngredient.model';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html'
})
export class OrderCreateComponent implements OnInit {

  @Output() cancelOrder = new EventEmitter()
  @Output() orderFinished = new EventEmitter()
  products: IProductOrder[] = []
  productFilter: string
  private allProducts: IProductOrder[] = []
  public observationOrder: string = ''

  constructor(private productService: ProductService, private orderService: OrderService, private router: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products.map(product => {
        return {
          productId: product.id,
          product: product,
          amount: 0,
          ingredients: product.productsIngredients 
            ? product?.productsIngredients.map(pi => pi.ingredient)
            : [],
          productOrderIngredients: []
        }
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
    if (this.products.length == undefined) {
      return 0
    } else {
      return this.products.length > 0
        ? this.products.map(p => p.product.price * p.amount).reduce((a, b) => a + b)
        : 0
    }
  }

  changeIngredient(po: IProductOrder, ingredient: IIngredient) {
    let index = po.ingredients.findIndex(i => i.id === ingredient.id)
    if (index != -1) {
      po.ingredients.splice(index, 1);
    } else {
      po.ingredients.push(ingredient);
    }
  }

  save() {
    if (this.products.filter(p => p.amount > 0).length > 0) {
      let productsOrder: IProductOrder[] = this.products.map((po: IProductOrder) => {
        return {
          amount: po.amount,
          productId: po.product.id,
          observation: null,
          productOrderIngredients: po.ingredients.map((i: IIngredient): IProductOrderIngredient => {
            return {
              productOrderId: 0,
              ingredientId: i.id,
              amountIngredient: 1
            }
          })
        }
      })

      let order: IOrder = {
        id: 0,
        observation: this.observationOrder,
        tableId: +this.router.snapshot.params.id,
        productsOrder: productsOrder
      }
      console.log(order);
      this.orderService.add(order, this.authenticationService.getAuthenticatedUser().id).subscribe(res => {
        if(res === true){
          alert('Ordered successfully!')
          this.orderFinished.emit();
        }
      })
    } else {
      alert('Select some product')
    }
  }

  cancel() {
    this.cancelOrder.emit()
  }
}
