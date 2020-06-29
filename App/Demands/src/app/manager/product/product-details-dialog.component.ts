import { Inject, Component } from '@angular/core';
import { IProduct } from 'src/app/Models/product.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    template: `
      <div style="width: 500px">
        <h2 style="margin-bottom: 0">Product Details</h2>
        <table>
          <thead style="background-color: #cecece">
           <tr>
            <th>Id#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
           </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{data.id}}</td>
              <td>{{data.name}}</td>
              <td>{{data.price}}</td>
              <td>{{data.stock}}</td>
              <td>{{data?.category?.name}}</td>
            </tr>
          </tbody>
        </table>  
      </div>
    `,
    styles: [`
      table {
        width: 100%;
        border: 1px solid black;
      }
      
      th, td {
        border: 1px solid;
        border-color: #000000;
        padding: 10px;
      }
    `]
})
export class ProductDetailsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: IProduct) { }
}