import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { BillingComponent } from './billing/billing.component';
import { SetupComponent } from './setup/setup.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    { path: 'customer', component: CustomerComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'setup', component: SetupComponent },
    { path: 'schedule', component: ScheduleComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
