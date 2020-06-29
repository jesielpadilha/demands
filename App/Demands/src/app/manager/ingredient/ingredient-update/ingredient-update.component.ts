import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IIngredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['./ingredient-update.component.sass']
})
export class IngredientUpdateComponent implements OnInit {

  form: FormGroup

  constructor(private ingredientService: IngredientService, private routerActive: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    })

    this.ingredientService.getById(+this.routerActive.snapshot.params.id).subscribe(res => {
      if (!res) {
        alert('Item not found!')
        this.router.navigate(['/manager/ingredients'])
      } else {
        this.form.setValue(res)
      }
    })
  }

  update(item: IIngredient) {
    if (this.form.valid) {
      this.ingredientService.update(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/ingredients'])
          return
        }
        alert('Failed to update')
        return
      })
    }
  }
}
