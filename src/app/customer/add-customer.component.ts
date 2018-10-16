import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { CustomerDTO } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-add-customer',
    templateUrl: 'add-customer.component.html',
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
export class AddCustomerDialogComponent implements OnInit {

    customerForm: FormGroup;
    tags = [];
    isEdit = false;
    action = 'Add';
    constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CustomerDTO,
        private fb: FormBuilder, private customerService: CustomerService) { }

    ngOnInit() {
        this.createForm();
        this.populateForm();
    }
    createForm() {
        this.customerForm = this.fb.group({
            fullname: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
        });
    }
    populateForm() {
        if (this.data) {
            this.isEdit = true;
            this.action = 'Edit';
            const customer = this.data;
            this.customerForm.get('fullname').setValue(customer.fullname);
            this.customerForm.get('dob').setValue(customer.dob);
            this.customerForm.get('email').setValue(customer.email);
            this.customerForm.get('gender').setValue(customer.gender);
            this.customerForm.get('phone').setValue(customer.phone);
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
        const customer = new CustomerDTO();
        if (this.data && this.data._id) {
            customer._id = this.data._id;
        }
        customer.fullname = this.customerForm.get('fullname').value;
        customer.dob = this.customerForm.get('dob').value;
        customer.email = this.customerForm.get('email').value;
        customer.gender = this.customerForm.get('gender').value;
        customer.phone = this.customerForm.get('phone').value;
        this.customerService.addCutomer(customer).subscribe(data => {
            debugger
        });
        this.dialogRef.close(customer);
    }
}
