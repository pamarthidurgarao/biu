import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddSetupDialogComponent } from './setup.dailog.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
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
  dataSource = new MatTableDataSource<any>(this.serviceData);
  displayedColumns: string[] = ['name', 'price', 'time',  'gender', 'actions'];

  ngOnInit() {
  }
  addService(event) {
    debugger;
    this.openDialog(true);
    event.stopPropagation();
  }

  openDialog(edit): void {
    const dialogRef = this.dialog.open(AddSetupDialogComponent, {
      width: '90%',
      panelClass: 'addCustomer',
      backdropClass: 'ssssss',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result !== undefined) {
      }
    });
  }

}
