import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TableService } from '../services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITable } from 'src/app/models/table.model';

@Component({
  selector: 'app-table-update',
  templateUrl: './table-update.component.html',
  styleUrls: ['./table-update.component.sass']
})
export class TableUpdateComponent implements OnInit {

  form: FormGroup

  constructor(private tableService: TableService, private routerActive: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[0-9]*')
      ]),
      description: new FormControl(''),
      isBusy: new FormControl('')
    })

    this.tableService.getById(+this.routerActive.snapshot.params.id).subscribe(res => {
      if (!res) {
        alert('Item not found!')
        this.router.navigate(['/manager/tables'])
      } else {
        this.form.setValue(res)
      }
    })
  }

  update(item: ITable) {
    if (this.form.valid) {
      this.tableService.update(item).subscribe(res => {
        if (res) {
          this.router.navigate(['/manager/tables'])
          return
        }
        alert('Failed to update')
        return
      })
    }
  }
}
