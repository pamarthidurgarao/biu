import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ServiceDTO, ServiceTypeDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';
import { StaffDTO, StaffPreferencesDTO, StaffTimingsDTO } from '../model/staff.model';
import { ProductDTO, ProductSubDTO } from '../model/product.model';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-product-dailog',
    templateUrl: 'product-dailog.component.html',
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
export class ProductSetupDialogComponent implements OnInit {

    productForm: FormGroup;
    tags = [];
    isEdit = false;
    action = 'Add';
    category = '';
    pageType: string;
    selectedType: any;
    services: ServiceTypeDTO[];
    controls: any[] = [];
    prefrencesCtrl: any;
    days: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    constructor(public dialogRef: MatDialogRef<ProductSetupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder, private setupService: SetupService) {
        this.pageType = data.pageType;
    }

    ngOnInit() {
        this.loadService();
        this.createForm();
        this.populateForm();
    }

    loadService() {
        this.setupService.getAllService().subscribe(response => {
            this.services = response.data;
        });
    }
    createForm() {
        this.productForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            stock: ['', Validators.required],
            brand: ['', Validators.required],
            quantity: ['', Validators.required]
        });
    }
    populateForm() {
        this.category = this.data.category;
        this.pageType = this.data.pageType;
        if (this.data.mode === 'Edit') {
            this.isEdit = true;
            this.action = 'Edit';
            this.productForm.get('id').setValue(this.data.service.id);
            this.productForm.get('name').setValue(this.data.service.name);
            this.productForm.get('price').setValue(this.data.service.time);
            this.productForm.get('totalQuantity').setValue(this.data.service.price);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeDailog() {
        console.log('s');
        this.dialogRef.close();
    }

    addProduct() {
        const productType = new ProductDTO();
        const product = new ProductSubDTO();
        const products = [];
        product.price = this.productForm.get('price').value;
        product.quantity = this.productForm.get('quantity').value;
        product.name = this.productForm.get('name').value;
        product.stock = this.productForm.get('stock').value;
        product.brand = this.productForm.get('brand').value;
        productType.category = this.category;
        products.push(product);
        productType.products = products;
        this.setupService.addProduct(productType).subscribe(response => {
            debugger;
        });
    }

}
