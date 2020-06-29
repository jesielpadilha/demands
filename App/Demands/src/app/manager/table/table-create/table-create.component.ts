import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITable } from 'src/app/models/table.model';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.sass']
})
export class TableCreateComponent implements OnInit {

  form: FormGroup

  constructor(private tableService: TableService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[0-9]*')
      ]),
      description: new FormControl('')
    })
  }

  create(item: ITable) {
    //TODO: check if the number already exists
    // this.tableService.getAll().subscribe(tables => {

    // })

    this.tableService.add(item).subscribe(res => {
      if (res) {
        this.router.navigate(['/manager/tables'])
        return
      }
      alert('Failed to add')
      return
    })
  }
}
