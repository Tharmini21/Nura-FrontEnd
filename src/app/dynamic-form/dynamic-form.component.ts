import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormField } from '../Services/formfield';
import { FormControl, 
             FormGroup, 
             ValidatorFn, 
             Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  formFields!: FormField[];
  form = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.form.valid) {
      let value = this.form.value;
    }
  }

  private getValidator(formField: FormField): ValidatorFn | null {
    switch(formField.validator) {
      case "email":
        return Validators.email;
      case "required":
        return Validators.required;
      default:
        return null;
    }
  }

}
