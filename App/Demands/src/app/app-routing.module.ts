import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableDetailsComponent } from './table/table-details/table-details.component';
import { AuthGuard } from './auth.guard';
import { OrderListComponent } from './order/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(a => a.ManagerModule),
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'table-details/:id', component: TableDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
