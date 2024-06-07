import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { StudentService } from '../student.service';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
  
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;

  dormitory: string[] = ['A', 'B', 'C'];
  studentGender: string[] = ['Male', 'Female'];
  schoolStatus: string[] = ['Boarder', 'Non-boarder'];
  grade: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  imageUrl!: string
  selectedImg!:[File]
  myControl = new FormControl('');
  options: string[] = [];
  parentId:string = ''

  filteredOptions!: Observable<string[]>;
  @ViewChild('matSelect1') matSelect!: MatSelect;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private snackBar:MatSnackBar,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _coreService: CoreService,
    
  ) {
    this.studentForm = this._fb.group({
      admNumber: ['', [Validators.required]],
      schoolCode: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: '',
      lastName: ['', [Validators.required]],
      studentGender: ['', [Validators.required]], // Assuming this corresponds to 'gender'
      dob: ['', [Validators.required]], // Assuming this corresponds to 'dob'
      dateOfAdmission: ['', [Validators.required]], // Assuming this corresponds to 'doa'
      healthStatus: '',
      grade: ['', [Validators.required]], // Assuming this corresponds to 'grade'
      stream: '',
      schoolStatus: '', // Assuming this corresponds to 'schoolStatus'
      dormitory: '', // Assuming this corresponds to 'dormitory'
      parentIdno: '', // Assuming this corresponds to 'parentIdno'
      schoolID: '', // Assuming this corresponds to 'schoolID'
      urls: ['']
      
    });
  }

  ngOnInit(): void {
     // Set up the filteredOptions observable to react to input changes
    this.filteredOptions = this.myControl.valueChanges.pipe(
      // Start with an empty string to show all options initially
      startWith(''),
      // Apply the filtering logic
      map(value => this._filter(value || ''))
    );
    this.studentForm.patchValue(this.data);
    this.getParents()
  }

  ngAfterViewInit() {
    // Open the select dropdown when there is input
    // Open the dropdown when there is input, close when cleared
    this.myControl.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        this.matSelect.open();
      } else {
        this.matSelect.close();
      }
    });
  }
  onSelectionChange(option: string) {
    // Set the selected option as the value of the input field
    this.myControl.setValue(option);
    this.matSelect.close(); // Close the dropdown after selection
    this.studentForm.get('parentIdno')?.setValue(option)
    console.log(this.studentForm.value.parentIdno);
    
  }
  // Filtering function to filter the options based on the input value
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFileChange(event:any){
    console.log('img', this.studentForm.value.urls);
    
    if (event.target.files && event.target.files.length) {
      this.selectedImg = event.target.files
      this.studentForm.get('urls')?.setValue(this.selectedImg as any)
      Array.from(this.selectedImg).forEach((img) => {
        const file = new FileReader()
        file.readAsDataURL(img as any)
        file.onload = (e: any) =>{
          this.imageUrl = e.target.result
        }
      })
      
    }
  }

  dateOfBirthValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());

    if (selectedDate >= today || selectedDate <= fourYearsAgo) {
      return { invalidDate: true };
    }
    return null;
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      //formData.dob = this.formatDate(formData.dob);
      //formData.dateOfAdmission = this.formatDate(formData.dateOfAdmission);
      const data = new FormData
      Object.keys(this.studentForm.controls).forEach((n) =>{
        data.append(n, this.studentForm.get(n)?.value)
      })
      data.append('dob', this.formatDate(formData.dob))
      data.append('dateOfAdmission', this.formatDate(formData.dateOfAdmission))
      if (formData.urls != undefined && formData.urls != '' && formData != null) {
        for (let i = 0; i < formData.urls.length; i++) {
          data.append(
            'urls', 
            this.selectedImg[i] || '',
            this.selectedImg[i]?.name || '' 
          )
          
        }
      }
      console.log(data);
      if (this.data) {
        this._studentService.updateStudent(this.data.id, data).subscribe(
          ((res) => {
            console.log(res);
            
          }),
          ((error) =>{
            this.snackBar.open(error.error.message, 'Close', {duration:3600, verticalPosition:'top'})
          }),
          ()=>{
            
            this.snackBar.open('Student Updated Successfuly', 'Close', {duration:3600, verticalPosition:'top'})
            this._dialogRef.close(true);

          }
        );
      } else {
      this._studentService.addStudent(data).subscribe({
        next: (val: any) => {
          this._coreService.openSnackbar('Student added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
        complete() {
          
        },
      });
      }
    }
  }

  private formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
  getParents(){
    this._studentService.getParents().subscribe(
      ((res) => {
        const parentId: any[] | Observable<string[]> = []
        const i = res.entity.forEach((e: any) =>{
          this.parentId = e.parentIdno
          parentId.push(e.parentIdno)
        }) 
        
        console.log('filtred 243',parentId);
        this.options = parentId
      }),
      ((err) => {
        console.log(err);
        
      }),
      () => {}
    )
  }
}