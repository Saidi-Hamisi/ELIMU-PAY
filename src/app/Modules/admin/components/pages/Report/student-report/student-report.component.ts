import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/Modules/management/student/student.service';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent {
  displayedColumns: string[] = [ 
    'index',
    'unique_id',
    'first_name',
    'debit',
    'credit',
    'balance'
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: StudentService
  ){}
  ngOnInit(){
    this.getStudent()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getStudent(){
    this.service.getStudentReport().subscribe(
      ((response) => {
        console.log('hello', response);
        this.dataSource = new MatTableDataSource(response.entity);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      ((err) =>{
        console.log(err);
      }),
      () => {}
    )
  }
}
export interface UserData {
    student_id: string,
    unique_id: string,
    first_name: string,
    debit: number,
    credit: number,
    balance: number
}