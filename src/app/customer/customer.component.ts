import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCustomerDialogComponent } from './add-customer.component';
import { CustomerService } from '../services/customer.service';
import { CustomerDTO } from '../model/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['fullname', 'phone', 'email', 'dob', 'gender', 'actions'];
  data: CustomerDTO[] = [];
  resultsLength = 0;
  dataSource: MatTableDataSource<CustomerDTO>;
  customer: CustomerDTO;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, private customerService: CustomerService) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  openDialog(edit): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '90%',
      panelClass: 'addCustomer',
      backdropClass: 'ssssss',
      data: edit ? this.customer : ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result !== undefined) {
        this.loadCustomers();
      }
    });
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.loadCutomers().subscribe(res => {
      this.data = res.data;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }
  
  editCustomer(row: CustomerDTO) {
    this.customer = row;
    this.openDialog(true);
  }

  deleteCustomer(row: CustomerDTO) {
    this.customerService.deleteCutomer(row._id).subscribe(res => {
      console.log('deleted');
    });
  }
}

