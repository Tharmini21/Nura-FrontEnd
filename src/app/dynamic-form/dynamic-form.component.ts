import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormField } from '../Services/formfield';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';


interface JsonFormValidators {
  min?: number;
  max?: number;
  isRequired?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  formFields!: FormField[];
  form = new FormGroup({});
  @Input() jsonFormData?: JsonFormData;
  public formData: any;

  public myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    // console.log(this.jsonFormData);
    // console.log(JsonFormData);
    this.http.get<JsonFormData[]>('../../assets/my-form.json')
    .subscribe((formData: JsonFormData[]) => {
      this.formData = formData;
      console.log(this.formData);
    });

  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.jsonFormData.firstChange) {
      console.log(this.jsonFormData);
    }
  }
  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }

}
