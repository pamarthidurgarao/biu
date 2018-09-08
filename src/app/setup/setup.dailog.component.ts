import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

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
    `]
})
export class AddSetupDialogComponent implements OnInit {

    customerForm: FormGroup;
    tags = [];
    isEdit = false;
    action = 'Add';
    constructor(public dialogRef: MatDialogRef<AddSetupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
        this.populateForm();
    }
    createForm() {
        this.customerForm = this.fb.group({
            customerName: ['', Validators.required],
            phoneNo: ['', Validators.required],
            email: ['', Validators.required],
            dob: ['', Validators.required],
            anniversary: ['', Validators.required],
            gender: ['', Validators.required],
            tags: [''],
            notes: ['']
        });
    }
    populateForm() {
        if (this.data) {
            this.isEdit = true;
            this.action = 'Edit';
            const customer = this.data;
            this.customerForm.get('customerName').setValue(customer.customerName);
            this.customerForm.get('anniversary').setValue(customer.anniversary);
            this.customerForm.get('dob').setValue(customer.dob);
            this.customerForm.get('email').setValue(customer.email);
            this.customerForm.get('gender').setValue(customer.gender);
            this.customerForm.get('notes').setValue(customer.notes);
            this.customerForm.get('phoneNo').setValue(customer.phoneNo);
            this.customerForm.get('tags').setValue(customer.tags);
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
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
    addCustomer() {
        console.log('s');
        // let customer={};
        // customer.customerName = this.customerForm.get('customerName').value;
        // customer.anniversary = this.customerForm.get('anniversary').value;
        // customer.dob = this.customerForm.get('dob').value;
        // customer.email = this.customerForm.get('email').value;
        // customer.gender = this.customerForm.get('gender').value;
        // customer.tags = this.tags;
        // customer.phoneNo = this.customerForm.get('phoneNo').value;
        this.dialogRef.close();
    }
}
