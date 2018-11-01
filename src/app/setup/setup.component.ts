import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddSetupDialogComponent } from './setup-dailog.component';
import { ServiceTypeDTO, ServiceDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';
import { StaffSetupDialogComponent } from './staff-dailog.component';
import { StaffDTO } from '../model/staff.model';
import { ProductDTO } from '../model/product.model';
import { ProductSetupDialogComponent } from './product-dailog.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(public dialog: MatDialog, public setupService: SetupService) { }
  serviceData: ServiceTypeDTO[] = [];
  staffData: StaffDTO[] = [];
  productData: ProductDTO[] = [];
  dataSource = new MatTableDataSource<ServiceTypeDTO>(this.serviceData);
  staffDataSource = new MatTableDataSource<StaffDTO>(this.staffData);
  productsDataSource = new MatTableDataSource<ProductDTO>(this.productData);
  displayedColumns: string[] = ['name', 'price', 'time', 'gender', 'actions'];
  staffDisplayedColumns: string[] = ['name', 'workFor', 'position', 'gender', 'actions'];
  productDisplayedColumns: string[] = ['name', 'brand', 'price', 'quantity', 'actions'];

  ngOnInit() {
    this.loadServices();
    this.loadStaff();
    this.loadProduct();
  }

  loadServices() {
    this.setupService.getAllService().subscribe(res => {
      this.serviceData = res.data;
    });
  }

  loadStaff() {
    this.setupService.getAllStaff().subscribe(res => {
      this.staffData = res.data;
    });
  }

  loadProduct() {
    this.setupService.getAllProducts().subscribe(res => {
      this.productData = res.data;
    });
  }

  addService(event, category, pageType) {
    this.openDialog('Add', category, undefined, pageType);
    event.stopPropagation();
  }

  editService(event, category, service, pageType) {
    this.openDialog('Edit', category, service, pageType);
    event.stopPropagation();
  }

  openDialog(mode, category, service, pageType): void {
    const dialogRef = this.dialog.open(AddSetupDialogComponent, {
      width: '90%',
      panelClass: 'addCustomer',
      backdropClass: 'ssssss',
      data: { 'mode': mode, 'category': category, 'service': service, 'pageType': pageType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result !== undefined) {
        if (result.pageType === 'service') {
          this.serviceData.forEach(element => {
            if (element.category === result.serviceType) {
              element.types.push(result.data);
              this.dataSource = this.tableDatasource(this.serviceData);
            }
          });
        } else {
          const newService = new ServiceTypeDTO();
          newService.category = result.data;
          newService.types = [];
          this.serviceData.push(newService);
        }
      }
    });
  }


  // Staff realted code changes
  openStaffDialog(mode, staff): void {
    const staffDialogRef = this.dialog.open(StaffSetupDialogComponent, {
      width: '90%',
      height: '500px',
      panelClass: 'addStaff',
      data: { 'mode': mode, 'staff': staff }
    });

    staffDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  openProductDialog(mode, product, category): void {
    const productDialogRef = this.dialog.open(ProductSetupDialogComponent, {
      width: '90%',
      height: '300px',
      panelClass: 'addProduct',
      data: { 'mode': mode, 'product': product, 'category': category }
    });

    productDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);

    });
  }

  addProduct($event, data, category) {
    this.openProductDialog('Add', data, category);
  }

  addStaff($event, mode, data) {
    this.openStaffDialog(mode, data);
  }

  tableDatasource(serviceData) {
    this.dataSource = new MatTableDataSource<ServiceTypeDTO>(serviceData);
    return this.dataSource;
  }

  staffDatasource() {
    this.staffDataSource = new MatTableDataSource<StaffDTO>(this.staffData);
    return this.staffDataSource;
  }

  productDatasource(products) {
    this.productsDataSource = new MatTableDataSource<ProductDTO>(products);
    return this.productsDataSource;
  }
}
