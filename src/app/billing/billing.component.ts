import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SetupService } from '../services/setup.service';
import { ServiceTypeDTO, ServiceDTO } from '../model/service.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  sources = ['Email', 'Social Media', 'Friends'];
  selectedServices: ServiceDTO[] = [];
  displayedColumns = ['name', 'price', 'action'];
  serviceData: ServiceTypeDTO[];
  orgServiceData: ServiceTypeDTO[];
  dataSource = new MatTableDataSource<any>(this.selectedServices);
  totalAmount = 0;
  payAmount = 0;
  discount = 0;
  constructor(public setupService: SetupService) { }

  ngOnInit() {
    this.setupService.loadCutomers().subscribe(data => {
      this.serviceData = data;
      this.orgServiceData = data;
    });
  }

  addService(serviceType, $event) {
    debugger
    if ($event.checked) {
      console.log(serviceType);
      this.selectedServices.push(serviceType);

    } else {
      this.selectedServices = this.selectedServices.filter(data => data !== serviceType);
    }
    this.dataSource = new MatTableDataSource<any>(this.selectedServices);
    this.calculateTotal();
  }


  removeService(service) {
    this.selectedServices = this.selectedServices.filter(data => data !== service);
    this.dataSource = new MatTableDataSource<any>(this.selectedServices);
  }

  serviceSelect(serviceType) {
    if (serviceType === 'All') {
      this.serviceData = this.orgServiceData;
    } else {
      this.serviceData = this.orgServiceData.filter(data => data.serviceType === serviceType);
    }
  }

  calculateTotal() {
    this.selectedServices.forEach(service => {
      this.totalAmount = this.totalAmount + service.price;
      this.payAmount = this.totalAmount;
    });
    this.applyDiscount();
  }

  calculatePayAmount() {

  }

  applyDiscount() {
    if (this.discount) {
      const disc = (this.totalAmount / 100) * this.discount;
      this.payAmount = this.totalAmount - disc;
    }

  }
}
