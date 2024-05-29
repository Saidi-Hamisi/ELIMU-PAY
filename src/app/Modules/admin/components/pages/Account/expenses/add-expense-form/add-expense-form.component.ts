import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense-form',
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.css']
})
export class AddExpenseFormComponent implements OnInit {
  loading: boolean = false
  form!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  submit(): void{
    this.loading = true;

  }

  close(): void{}

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get status() {
    return this.form.get('status');
  }
}
