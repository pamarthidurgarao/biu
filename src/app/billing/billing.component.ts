import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  sources = ['Email', 'Social Media', 'Friends'];
  selectedServices = [];
  displayedColumns = ['name', 'price', 'action'];
  serviceData = [{
    'serviceName': 'Hair Cut',
    'data': [{ 'id': 5, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 1, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 2, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 3, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 4, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' }
    ]
  },
  {
    'serviceName': 'Shave',
    'data': [{ 'id': 5, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 1, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 2, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 3, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' },
    { 'id': 4, 'name': 'Basic Haircut - U/V/Straight', 'price': 400, 'time': 30, 'timeType': 'Min', 'gender': 'Male' }
    ]
  }];
  dataSource = new MatTableDataSource<any>(this.selectedServices);
  constructor() { }

  ngOnInit() {
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
  }


  removeService(service) {
    this.selectedServices = this.selectedServices.filter(data => data !== service);
    this.dataSource = new MatTableDataSource<any>(this.selectedServices);
  }
}
