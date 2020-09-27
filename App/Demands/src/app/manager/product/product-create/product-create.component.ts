
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product.model';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { CategoryService } from '../../category/services/category.service';
import { IIngredient } from 'src/app/models/ingredient.model';
import { IngredientService } from '../../ingredient/services/ingredient.service';

@Component({
    templateUrl: 'product-create.component.html',
    styles: [`
  .mat-raised-button~.mat-raised-button {
    margin-left: 10px
  }
  `]
})
export class ProductCreateComponent implements OnInit {

    form: FormGroup
    categoriesProduct: ICategoryProduct[] = []
    ingredientsList: IIngredient[] = []
    constructor(private productService: ProductService, private categoryService: CategoryService, private ingredientService: IngredientService,
        private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
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

        this.categoryService.getAll().subscribe(categories => {
            this.categoriesProduct = categories
        })

        this.ingredientService.getAll().subscribe(ingredients => {
            this.ingredientsList = ingredients
        })
    }

    create(item: IProduct) {
        item.productsIngredients = item.ingredients ? item.ingredients.map(ingredientId => {
            return { ingredientId: ingredientId }
        }) : null;

        this.productService.add(item).subscribe(res => {
            if (res) {
                this.router.navigate(['/manager/products'])
                return
            }
            alert('Failed to add')
            return
        })
    }
}