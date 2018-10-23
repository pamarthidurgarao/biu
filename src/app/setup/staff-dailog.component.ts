import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ServiceDTO, ServiceTypeDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-staff-dailog',
    templateUrl: 'staff-dailog.component.html',
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
export class StaffSetupDialogComponent implements OnInit {

    staffForm: FormGroup;
    tags = [];
    isEdit = false;
    action = 'Add';
    category = '';
    pageType: string;
    selectedType: any;
    services: ServiceTypeDTO[];
    prefrencesCtrl: any;
    days: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    constructor(public dialogRef: MatDialogRef<StaffSetupDialogComponent>,
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
        this.staffForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            position: ['', Validators.required],
            gender: [''],
            workFor: [''],
            preferences: this.fb.array([]),
            timings: this.fb.array([])
        });
    }
    populateForm() {
        this.category = this.data.category;
        this.pageType = this.data.pageType;
        if (this.data.mode === 'Edit') {
            this.isEdit = true;
            this.action = 'Edit';
            this.staffForm.get('id').setValue(this.data.service.id);
            this.staffForm.get('name').setValue(this.data.service.name);
            this.staffForm.get('time').setValue(this.data.service.time);
            this.staffForm.get('priceInclTax').setValue(this.data.service.price);
            this.staffForm.get('gender').setValue(this.data.service.gender);
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    initItemRows() {
        return this.fb.group({
            day: [''],
            from: [''],
            to: ['']
        });
    }
    addPreferences(event, service) {
        var control = <FormArray>this.staffForm.controls['preferences'];
        if (event.checked) {
            control.push(new FormControl(service.category + "|" + service._id))
        } else {
            const key = service.category + "|" + service._id;
            var index = (<FormArray>this.staffForm.get('preferences')).controls.findIndex(x => x.value === key)
            control.removeAt(index);
            debugger
        }
    }

    closeDailog() {
        console.log('s');
        this.dialogRef.close();
    }
    addService() {
        console.log('s');
        const service = new ServiceDTO();
        if (this.data.service && this.data.service.id) {
            service.id = this.data.service.id;
        }
        service.name = this.staffForm.get('name').value;
        service.price = this.staffForm.get('priceInclTax').value;
        service.gender = this.staffForm.get('gender').value;
        service.time = this.staffForm.get('time').value;

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
