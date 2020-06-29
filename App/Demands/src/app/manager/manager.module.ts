import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Application Components
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeComponent } from './home/home.component';
//product
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailsDialog } from './product/product-details-dialog.component';
//category
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
//ingredient
import { IngredientListComponent } from './ingredient/ingredient-list/ingredient-list.component';
import { IngredientCreateComponent } from './ingredient/ingredient-create/ingredient-create.component';
import { IngredientUpdateComponent } from './ingredient/ingredient-update/ingredient-update.component';
//table
import { TableListComponent } from './table/table-list/table-list.component';
import { TableCreateComponent } from './table/table-create/table-create.component';
import { TableUpdateComponent } from './table/table-update/table-update.component';
//user
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

//Libs
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarAdminComponent,
    //product
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailsDialog,
    //category
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    //ingredient
    IngredientListComponent,
    IngredientCreateComponent,
    IngredientUpdateComponent,
    //table
    TableListComponent,
    TableCreateComponent,
    TableUpdateComponent,
    //user
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Libs
    [SweetAlert2Module.forRoot()],
  ],
  exports: [
    NavbarAdminComponent,
    HomeComponent,
    // ProductListComponent,
    // ProductCreateComponent,
    // ProductDetailsDialog
  ]
})
export class ManagerModule { }
