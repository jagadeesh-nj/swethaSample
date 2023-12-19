import { AfterViewInit, Component, ViewChild, OnInit, inject, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData, displayedColumns } from 'src/app/models/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit{

  dataSource: MatTableDataSource<any>;
  displayedColumns = displayedColumns;
  constructor(public _dialog: MatDialog, private _empService:EmployeeService,
    private _snackbar: StatusService,) {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getEmployeeList();
  }
  // dialogConfig = new MatDialogConfig();
 
  // dialogclose() {
  //   let dialogRef = this._dialog.open(AddEmployeeComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next : (val) => {
  //       this.getEmployeeList();
  //     },
  //     error : console.log
  //   })
  // }

  addEmployee() {
    let dialogRef = this._dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        this.getEmployeeList();
      },
      error : console.log
    })
  }
 
  editEmployee(data: any) {
    // this.dialogConfig.data = {data};
  //  this._dialog.open(AddEmployeeComponent, this.dialogConfig)
  let dialogRef = this._dialog.open(AddEmployeeComponent, {      
      data: data  // or you can just use "data,"
     });
     dialogRef.afterClosed().subscribe({
      next : (val) => {
        this.getEmployeeList();
      },
      error : console.log
    })
  }
  getEmployeeList(){
    this._empService.getEmployees().subscribe({
      next : (res : any)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      },
      error : (err: any)=> {
        console.error(err);
      }
    })
  }
  deleteEmployee(id: number) {
    if(confirm("Are you sure to delete id : "+id)) {
      this._empService.deleteEmployee(id).subscribe({
        next: (val) => {
          this._snackbar.openSnackBar("Deleted Successfully");
          this.getEmployeeList();
        },
        error : console.error
      })
    }
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
