import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeComponent } from './home/home.component';
//product
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
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

const routes: Routes = [
  { path: '', component: NavbarAdminComponent },
  { path: 'home', component: HomeComponent },
  //product
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductCreateComponent },
  //category
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryCreateComponent },
  { path: 'categories/update/:id', component: CategoryUpdateComponent },
  //ingredient
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredients/new', component: IngredientCreateComponent },
  { path: 'ingredients/update/:id', component: IngredientUpdateComponent },
  //table
  { path: 'tables', component: TableListComponent },
  { path: 'tables/new', component: TableCreateComponent },
  { path: 'tables/update/:id', component: TableUpdateComponent },
  //user
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserCreateComponent },
  { path: 'users/update/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
