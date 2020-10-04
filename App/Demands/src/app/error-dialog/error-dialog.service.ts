import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  public isDialogOpen: Boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthenticationService) { }

  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isDialogOpen = false;
      if (data.status == 401) {
        this.authService.logout()
        this.router.navigate(['/authentication/login'])
      }
    });
  }
}
