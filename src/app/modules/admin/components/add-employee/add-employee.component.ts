import { Component, Inject, OnInit } from '@angular/core';
import * as common from '../../../../models/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{
  empForm : FormGroup;
  education = common.education;
  btnText : string;
  constructor(private _fb: FormBuilder, 
    private _empService:EmployeeService, 
    private _dialogRef: MatDialogRef<AddEmployeeComponent>,
    private _status:StatusService, @Inject (MAT_DIALOG_DATA) public data: any,
    private _snackbar: StatusService,){
    this.empForm = this._fb.group(    
       {
        firstName : '',
        lastName:'',
        dob:'',
        email:'',
        gender:'',
        company:'',
        salary:'',
        education:'',
        experience: ''
       }
    )
  }
 
  getEmployees$ = this._empService.getEmployees();
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  submitForm() {
    console.log(this.empForm.value);
    if(this.data) {
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next : (val : any) => {
          this._snackbar.openSnackBar("Employee Updated Successfully");
          this._dialogRef.close(true);
        },
        error: console.error
      })
    }
    else {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next : (val : any) => {
          this._status.openSnackBar("Employee added Successfully");
          this._dialogRef.close(true);
        },
        error : (err: any)=> {
          console.error(err);
        }
      })
    }
  
  }
}
