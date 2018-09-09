import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ServiceDTO } from '../model/service.model';

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
    serviceType = '';
    pageType: string;
    selectedType: any;
    subServiceName: string;

    constructor(public dialogRef: MatDialogRef<AddSetupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder) {
        this.pageType = data.pageType;
    }

    ngOnInit() {
        this.createForm();
        this.populateForm();
    }
    createForm() {
        this.serviceForm = this.fb.group({
            subCategoryName: ['', Validators.required],
            serviceName: ['', Validators.required],
            duration: ['', Validators.required],
            priceInclTax: ['', Validators.required],
            gender: ['']
        });
    }
    populateForm() {
        this.serviceType = this.data.serviceName;
        this.pageType = this.data.pageType;
        if (this.data.mode === 'Edit') {
            debugger
            this.isEdit = true;
            this.action = 'Edit';
            this.serviceForm.get('subCategoryName').setValue(this.data.service.subCategoryName);
            this.serviceForm.get('serviceName').setValue(this.data.service.serviceName);
            this.serviceForm.get('duration').setValue(this.data.service.duration);
            this.serviceForm.get('priceInclTax').setValue(this.data.service.price);
            this.serviceForm.get('gender').setValue(this.data.service.gender);
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    addSubService() {
        this.dialogRef.close({
            'data': this.subServiceName,
            'mode': this.action,
            'serviceType': this.selectedType,
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
        console.log('s');
        const service = new ServiceDTO();
        service.subCategoryName = this.serviceForm.get('subCategoryName').value;
        service.serviceName = this.serviceForm.get('serviceName').value;
        service.price = this.serviceForm.get('priceInclTax').value;
        service.gender = this.serviceForm.get('gender').value;
        service.duration = this.serviceForm.get('duration').value;
        this.dialogRef.close({ 'data': service, 'mode': this.action, 'serviceType': this.serviceType, 'pageType': this.pageType });
    }
}
