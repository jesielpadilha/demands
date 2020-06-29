import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.sass']
})
export class CategoryUpdateComponent implements OnInit {

  form: FormGroup

  constructor(private categoryService: CategoryService, private routerActive: ActivatedRoute, 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    }) 

    this.categoryService.getById(+this.routerActive.snapshot.params.id).subscribe(res => {
      if (!res) {
        alert('Item not found!')
        this.router.navigate(['/manager/categories'])
      } else {
        this.form.setValue(res)
      }
    })
  }

  update(item: ICategoryProduct) {
    if( this.form.valid){
      this.categoryService.update(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/categories'])
          return
        }
        alert('Failed to update')
        return
      })
    }   
  }
}
