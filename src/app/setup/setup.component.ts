import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddSetupDialogComponent } from './setup-dailog.component';
import { ServiceTypeDTO, ServiceDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(public dialog: MatDialog, public setupService: SetupService) { }
  serviceData: ServiceTypeDTO[] = [];
  dataSource = new MatTableDataSource<ServiceTypeDTO>(this.serviceData);
  displayedColumns: string[] = ['name', 'price', 'time', 'gender', 'actions'];

  ngOnInit() {
    this.setupService.loadCutomers().subscribe(data => {
      this.serviceData = data;
      debugger
    });
  }
  addService(event, serviceName, pageType) {
    this.openDialog('Add', serviceName, undefined, pageType);
    event.stopPropagation();
  }

  editService(event, serviceName, service, pageType) {
    debugger
    this.openDialog('Edit', serviceName, service, pageType);
    event.stopPropagation();
  }

  openDialog(mode, serviceName, service, pageType): void {
    const dialogRef = this.dialog.open(AddSetupDialogComponent, {
      width: '90%',
      panelClass: 'addCustomer',
      backdropClass: 'ssssss',
      data: { 'mode': mode, 'serviceName': serviceName, 'service': service, 'pageType': pageType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result !== undefined) {
        debugger
        if (result.pageType === 'service') {
          this.serviceData.forEach(element => {
            if (element.serviceType === result.serviceType) {
              element.data.push(result.data);
              this.dataSource = this.tableDatasource(this.serviceData);
            }
          });
        } else {
          const newService = new ServiceTypeDTO();
          newService.serviceType = result.data;
          newService.data = [];
          this.serviceData.push(newService);
        }
      }
    });
  }
  tableDatasource(serviceData) {
    this.dataSource = new MatTableDataSource<ServiceTypeDTO>(serviceData);
    return this.dataSource;
  }
}
