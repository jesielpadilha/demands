import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Router } from '@angular/router';
import { ITable } from '../models/table.model';
import { TableService } from '../manager/table/services/table.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  tables: ITable[] = []
  constructor(private authService: AuthenticationService, private router: Router, 
    private tableService: TableService) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authentication/login'])
    } else {
       this.tableService.getAll().subscribe(tables => {
        this.tables = tables
       })
    }
  }
}
