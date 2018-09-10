import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav/app-nav.component';
import { CustomerComponent } from './customer/customer.component';

import { AddCustomerDialogComponent } from './customer/add-customer.component';
import { BillingComponent } from './billing/billing.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { SetupComponent } from './setup/setup.component';
import { AddSetupDialogComponent } from './setup/setup-dailog.component';
import { SetupService } from './services/setup.service';
import { ScheduleComponent } from './schedule/schedule.component';
@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    CustomerComponent,
    AddCustomerDialogComponent,
    AddSetupDialogComponent,
    BillingComponent,
    SetupComponent,
    ScheduleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DatepickerModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [CustomerService, SetupService],
  bootstrap: [AppComponent],
  entryComponents: [AddCustomerDialogComponent, AddSetupDialogComponent]
})
export class AppModule { }
