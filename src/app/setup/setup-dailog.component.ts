import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ServiceDTO, ServiceTypeDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-setup-dailog',
    templateUrl: 'setup-dailog.component.html',
    styles: [`
        .head{
            height : 40px;
        }
        .addCustomer {
            padding: 0px;
        }
        .tags{
            width:97% !important;
        }
        .mat-form-field {
            padding: 10px;
            width: 31%;
        }
        .button-row button,
        .button-row a {
            margin-right: 8px;
        }
        .subType{
            height : 50%;
        }
    `]
})
export class AddSetupDialogComponent implements OnInit {

    serviceForm: FormGroup;
    tags = [];
    isEdit = false;
    action = 'Add';
    category = '';
    pageType: string;
    selectedType: any;
    serviceType: any;

    constructor(public dialogRef: MatDialogRef<AddSetupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder, private setupService: SetupService) {
        this.pageType = data.pageType;
    }

    ngOnInit() {
        this.createForm();
        this.populateForm();
    }
    createForm() {
        this.serviceForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            time: ['', Validators.required],
            priceInclTax: ['', Validators.required],
            gender: ['']
        });
    }
    populateForm() {
        this.category = this.data.category;
        this.pageType = this.data.pageType;
        if (this.data.mode === 'Edit') {
            debugger
            this.isEdit = true;
            this.action = 'Edit';
            this.serviceForm.get('id').setValue(this.data.service.id);
            this.serviceForm.get('name').setValue(this.data.service.name);
            this.serviceForm.get('time').setValue(this.data.service.time);
            this.serviceForm.get('priceInclTax').setValue(this.data.service.price);
            this.serviceForm.get('gender').setValue(this.data.service.gender);
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    addSubService() {
        this.dialogRef.close({
            'mode': this.action,
            'category': this.category,
            'pageType': this.pageType
        });

    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
    }

    remove(tag): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

    closeDailog() {
        console.log('s');
        this.dialogRef.close();
    }
    addService() {
        debugger
        console.log('s');
        const service = new ServiceDTO();
        if (this.data.service && this.data.service.id) {
            service.id = this.data.service.id;
        }
        service.name = this.serviceForm.get('name').value;
        service.price = this.serviceForm.get('priceInclTax').value;
        service.gender = this.serviceForm.get('gender').value;
        service.time = this.serviceForm.get('time').value;

        const serviceRequest = new ServiceTypeDTO();
        const types = new Array<ServiceDTO>();
        serviceRequest.category = this.data.category;
        types.push(service);
        serviceRequest.types = types;

        this.setupService.addService(serviceRequest).subscribe(response => {

        });
        this.dialogRef.close({ 'data': service, 'mode': this.action, 'category': this.category, 'pageType': this.pageType });
    }
}
