import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentService } from './student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = [
    'uniqueId',
    'firstName',
    'middleName',
    'lastName',
    'studentGender',
    'admNumber',
    'grade',
    'stream',
    'dateOfAdmission',
    'dob',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  //studentDetails: any = null; // Holds the student details to be displayed

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getStudentList();
  }
  openAddEditStudentForm() {
    const dialogRef = this._dialog.open(AddStudentComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
}

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next: (res: any) => {
        //if (res && Array.isArray(res.entity)) {
          this.dataSource = new MatTableDataSource(res.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log('Error fetching user list:',err);

        },
      });
    }
        
         

     // error: (err) => {
        //console.error('An error occurred while fetching students:', err);
     // }
   // });
  //}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number) {
    const url = `${environment.apiUrl}students/${id}/`
    const dialogRef:MatDialogRef<DeleteConfirmationComponent> = this._dialog.open(DeleteConfirmationComponent, {
      data:{
        url: url
      }
    })

    dialogRef.afterClosed().subscribe(
      ((result) => {
        this.getStudentList()
      })
    )
  }

  openUpdateStudentForm(data:any) {
    const dialogRef = this._dialog.open(AddStudentComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
  }
}
  //openEditForm(data: any) {
    //const dialogRef = this._dialog.open(AddStudentComponent, {
    //  data,
    //});
    //dialogRef.afterClosed().subscribe({
      //next: (val) => {
       // if (val) {
         // this.getStudentList();
       // }
     // }
   // });
  //}

 // showStudentDetails(uniqueId: string) {
   // this._studentService.getStudentDetails(uniqueId).subscribe({
      //next: (res) => {
     //   this.studentDetails = res;
      //},
      //error: (err) => {
       // console.error('Error fetching student details:', err);
   //   }
   // });
  //}
//}
