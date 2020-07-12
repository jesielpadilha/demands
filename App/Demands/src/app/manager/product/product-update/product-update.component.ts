
import { Component, OnInit, ResolvedReflectiveFactory, resolveForwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product.model';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { CategoryService } from '../../category/services/category.service';
import { IIngredient } from 'src/app/models/ingredient.model';
import { IngredientService } from '../../ingredient/services/ingredient.service';

@Component({
  templateUrl: 'product-update.component.html',
  styles: [`
  .mat-raised-button~.mat-raised-button {
    margin-left: 10px
  }
  `]
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup
  categoriesProduct: ICategoryProduct[] = []
  ingredientsList: IIngredient[] = []
  constructor(private productService: ProductService, private categoryService: CategoryService, private ingredientService: IngredientService,
    private routerActive: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]),
      categoryId: new FormControl('', Validators.required),
      ingredients: new FormControl(''),
    })
    //load and fill select of Categories
    this.categoryService.getAll().subscribe(categories => {
      this.categoriesProduct = categories
    })
    //load and fill select of Ingredients
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredientsList = ingredients
    })

    this.productService.getById(+this.routerActive.snapshot.params.id).subscribe(res => {
      if (!res) {
        alert('Item not found!')
        this.router.navigate(['/manager/ingredients'])
      } else {
        let ingredients: number[] = [];
        if (res.productsIngredients !== null && res.productsIngredients.length > 0) {
          ingredients = res.productsIngredients.map(p => p.ingredientId)
        }

        this.form.setValue({
          id: res.id,
          name: res.name,
          description: res.description,
          price: res.price,
          stock: res.stock,
          categoryId: res.categoryId,
          ingredients: ingredients
        })
      }
    })
  }

  update(item: IProduct) {
    if (this.form.valid) {
      item.productsIngredients = item.ingredients.map(ingredientId => {
        return { productId: item.id, ingredientId: ingredientId }
      })

      this.productService.update(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/products'])
          return
        }
        alert('Failed to update')
        return
      })
    }
  }
}
