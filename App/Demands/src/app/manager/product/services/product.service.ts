import { Injectable } from "@angular/core";
import { IProduct } from 'src/app/Models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private httpOptions: any
    private apiDomain = 'http://localhost:5000/api/'

    constructor(private http: HttpClient){

    }
    // getProducts(): IProduct[] {
    //     return _PRODUCTS;
    // }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.apiDomain + 'product');
    }
}

const _PRODUCTS: IProduct[] = [
    {
        id: 1,
        name: 'product1',
        description: 'product1 description',
        price: 10,
        stock: 100,
        categoryId: 0,
        category: {
            id: 1,
            name: 'Meat'
        }
    },
    {
        id: 2,
        name: 'product2',
        description: 'product2 description',
        price: 10,
        stock: 100,
        categoryId: 0,
        category: {
            id: 1,
            name: 'Meat'
        }
    },
    {
        id: 3,
        name: 'product3',
        description: 'product3 description',
        price: 10,
        stock: 100,
        categoryId: 0,
        category: {
            id: 1,
            name: 'Meat'
        },
        productsIngredients: [
            { id: 1, name: 'ingredient 1', checked: true },
            { id: 2, name: 'ingredient 2', checked: true },
            { id: 3, name: 'ingredient 3', checked: true }
        ]
    }
]