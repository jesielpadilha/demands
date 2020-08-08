import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material Components
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
  ]
})
export class MaterialModule { }
