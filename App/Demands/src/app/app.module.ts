import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Application Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
//table
import { TableDetailsComponent } from './table/table-details/table-details.component';
//order
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
//Payment
import { PaymentComponent } from './payment/payment.component';

//Error
import { ErrorDialogComponent } from './error-dialog/error-dialog/error-dialog.component';
import { ErrorDialogService } from './error-dialog/error-dialog.service';

//Libs
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    //table
    TableDetailsComponent,
    //order
    OrderListComponent,
    OrderCreateComponent,
    PaymentComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    AuthenticationModule,
    //Libs
    [SweetAlert2Module.forRoot()],
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, 
      multi: true
    },
    ErrorDialogService   
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
