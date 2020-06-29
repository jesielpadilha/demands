import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { Router } from '@angular/router';
import { IIngredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.sass']
})
export class IngredientCreateComponent implements OnInit {

  form: FormGroup

  constructor(private ingredientService: IngredientService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    })
  }

  create(item: IIngredient) {
    this.ingredientService.add(item).subscribe(res => {
      if (res) {
        this.router.navigate(['/manager/ingredients'])
        return
      }
      alert('Failed to add')
      return
    })
  }
}
