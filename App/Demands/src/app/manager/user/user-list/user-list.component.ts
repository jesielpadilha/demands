import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, UserType } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  userTypeName = UserType;
  displayedColumns: string[] = ['Id', 'Name', 'Username', 'Type', 'IsActive', 'Actions'];

  dataSource: MatTableDataSource<IUser>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('swalEntity') private swalEntity: SwalComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getAll().subscribe(items => {
      this.dataSource = new MatTableDataSource<IUser>(items);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(item) {
    this.userService.getById(item.id).subscribe(res => {
      console.log(res);
    })
    
    this.swalEntity.update({
      title: 'Item Details',
      html: `
        Name: ${item.name} <br/>
        Username: ${item.username} <br/>
        Tipe: ${this.userTypeName[item.type]} <br/>
        Is Active? ${item.isActive ? 'Yes' : 'No'} <br/>
      `,
      icon: null,
      toast: false,
      position: 'center',
      timer: 0
    })
    this.swalEntity.fire()
  }

  delete(item) {
    this.userService.delete(item.id).subscribe(res => {
      if (res) {
        this.loadData()
        this.swalEntity.update({
          title: 'Item deleted successfully',
        })
        this.swalEntity.fire()
      } else {
        this.swalEntity.update({
          title: 'Fail to delete',
          icon: 'error'
        })
      }
    })
  }

  beforeDelete(item) {
    this.deleteSwal.update({
      html: `<p>Do you really wanna delete the user: <b>${item.username}</b>?</p>`
    });
  }

}
