import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ServiceDTO, ServiceTypeDTO } from '../model/service.model';
import { SetupService } from '../services/setup.service';
import { StaffDTO, StaffPreferencesDTO, StaffTimingsDTO } from '../model/staff.model';

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
        this.prepareTimings();
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
    prepareTimings() {
        this.days.forEach(day => {
            const control = <FormArray>this.staffForm.controls['timings'];
            control.push(this.addTiming(day));
        });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    addTiming(day) {
        return this.fb.group({
            status: [],
            day: [day],
            from: [''],
            to: ['']
        });
    }
    addPreferences(event, service) {
        const control = <FormArray>this.staffForm.controls['preferences'];
        if (event.checked) {
            control.push(new FormControl(service.category + '|' + service._id));
        } else {
            const key = service.category + '|' + service._id;
            const index = (<FormArray>this.staffForm.get('preferences')).controls.findIndex(x => x.value === key);
            control.removeAt(index);
            debugger
        }
    }

    closeDailog() {
        console.log('s');
        this.dialogRef.close();
    }

    addStaff() {
        debugger
        const staff = new StaffDTO();
        staff.gender = this.staffForm.get('gender').value;
        staff.mobile = this.staffForm.get('phone').value;
        staff.name = this.staffForm.get('name').value;
        staff.position = this.staffForm.get('position').value;
        staff.preferedGender = this.staffForm.get('workFor').value;
        const preferences = new Array<StaffPreferencesDTO>();
        (<FormArray>this.staffForm.get('preferences')).controls.forEach(x => {
            const pref = new StaffPreferencesDTO();
            const res = x.value.split('|');
            pref.name = res[0];
            pref.id = res[1];
            preferences.push(pref);
        });
        staff.preferences = preferences;
        const timings = new Array<StaffTimingsDTO>();
        (<FormArray>this.staffForm.get('timings')).controls.forEach(x => {
            if (x.get('status').value) {
                const sch = new StaffTimingsDTO();
                sch.day = x.get('day').value;
                sch.from = x.get('from').value;
                sch.to = x.get('to').value;
                timings.push(sch);
            }
        });
        staff.timings = timings;
        this.setupService.addStaff(staff).subscribe(response => {
            debugger;
        });
    }

}
