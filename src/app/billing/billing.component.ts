import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SetupService } from '../services/setup.service';
import { ServiceTypeDTO, ServiceDTO } from '../model/service.model';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
  toDay = new Date().toLocaleDateString();
  invoice = '2018/01/001';
  orgName = 'Org';
  iee = 0;
  customerName = '';
  address = '';
  gender = '';
  phoneNumber = '';
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
    this.calculateTotal();
  }

  serviceSelect(serviceType) {
    if (serviceType === 'All') {
      this.serviceData = this.orgServiceData;
    } else {
      this.serviceData = this.orgServiceData.filter(data => data.serviceType === serviceType);
    }
  }

  calculateTotal() {
    this.totalAmount = 0;
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
    } else {
      this.payAmount = this.totalAmount;
    }

  }

  checkBoxStatus(serviceType) {
    const service = this.selectedServices.filter(data => data === serviceType);
    if (service.length > 0) {
      return true;
    }
    return false;
  }

  generateBill() {
    const data = document.getElementById('pdfPrint');
    data.classList.remove('d-none');
    html2canvas(data).then(canvas => {
      const data1 = document.getElementById('pdfPrint');
      data1.classList.add('d-none');
      const imgWidth = 208;
      const pageHeight = 495;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.customerName + '-bill.pdf');
    });
  }

  hideEle() {
    this.iee = 10;
  }

}
