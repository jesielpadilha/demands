import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup

  constructor(private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    }) 
  }

  create(item: ICategoryProduct) {
    this.categoryService.add(item).subscribe(res => {
      if (res) {
        this.router.navigate(['/manager/categories'])
        return
      }
      alert('Failed to add')
      return
    })
  }
}
