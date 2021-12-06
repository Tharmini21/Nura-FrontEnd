import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME, NgWizardModule, NgWizardStep } from 'ng-wizard';
import { AuthService } from '../Services/auth.service';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../Services/formfield';
import { DatePipe } from '@angular/common'
// import {moment} from 'moment';
// smarclient = require('smartsheet');
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@Component({
  selector: 'app-ng-wizard',
  templateUrl: './ng-wizard.component.html',
  styleUrls: ['./ng-wizard.component.css']
})

export class NgWizardComponent implements OnInit {
  // @Input() token: any;
  token: any;
  smartsheetaccesstoken: any;
  // smartsheetaccesstoken: string = "";
  tokenresponsedata: any = [];
  tokenresponse: any;
  oldtokenresponse: any;
  formFields!: FormField[];
  myForm = new FormGroup({});
  // myForm = new FormGroup({
  //   AnswerInput: new FormControl('', Validators.required),
  //   AnswerRadio: new FormControl('', Validators.required),
  //   AnswerSelect: new FormControl('', Validators.required),
  //   Answerdatapicker: new FormControl('', Validators.required)
  // });
  // get AnswerInput() { return this.myForm.get("AnswerInput") };
  // get AnswerRadio() { return this.myForm.get("AnswerRadio") };
  // get AnswerSelect() { return this.myForm.get("AnswerSelect") };
  // get Answerdatapicker() { return this.myForm.get("Answerdatapicker") };


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    // toolbarSettings: {
    //   toolbarExtraButtons: [
    //     { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
    //   ],
    // }
  };

  constructor(private ngWizardService: NgWizardService, private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.token = localStorage.getItem("token");
    // this.GetOpportunityfieldlist();
    this.smartsheetaccesstoken = localStorage.getItem("smartsheettoken");
    this.GetMappingsheetlist();
    // this.myForm = this.fb.group({
    //   AnswerInput: new FormControl('', Validators.required),
    //   AnswerRadio: new FormControl('', Validators.required),
    //   AnswerSelect: new FormControl('', Validators.required),
    //   Answerdatapicker: new FormControl('', Validators.required)
    // });
  }
  // showPreviousStep(event?: Event) {
  //   this.ngWizardService.previous();
  // }

  // showNextStep(event?: Event) {
  //   this.ngWizardService.next();
  // }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    //console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
  sheetId: string = "";
  answersheetId: string = "";
  SmartsheetList: any = [];
  access_token: string = "";
  OpportunityFieldList: any = [];
  Outputanswerdata: any[] = [];
  Previewanswerdata: any[] = [];
  questionnumber: number = 0;
  answer: string = "";
  fieldtype: string = "";
  Showloader: boolean = false;
  Showtextbox: boolean = true;
  Showlist: boolean = true;
  Showcheckbox: boolean = true;
  Showdatetimepicker: boolean = true;
  checked: boolean = false;
  unchecked: boolean = false;
  mySelect = '';
  dateOfBirth: string = "";
  selectedValue: any;
  format = 'yyyy-MM-dd hh:mm';
  locale = 'en-US';
  MappingSheetList: any = [];
  OpportunityList: any;
  SalesForceUserdetails: any;
  GetSalesforceToken() {
    const res = this.MappingSheetList.filter((x: any) => x.key == "Username");
    var username = res[0].values;
    const passwordval = this.MappingSheetList.filter((x: any) => x.key == "Password");
    var password = passwordval[0].values;
    this.authService.login(username, password).subscribe(
      (data: any) => {
        this.access_token = data.access_token;
        localStorage.setItem("token", this.access_token);
        this.Getopportunitylist();
        this.GetOpportunityfieldlist();
        this.GetSalesforceuserdetails(username,this.access_token);
      },
      err => {
        console.log(err);
      }
    );
  }
  GetSalesforceuserdetails(username: string, token: string) {
    this.authService.GetSalesforceuserdetails(username,token).subscribe(
      (data: any) => {
        this.SalesForceUserdetails = data.records;
        console.log(this.SalesForceUserdetails);
      },
      err => {
        console.log(err);
      }
    )
  };
  Getopportunitylist() {
    this.Showloader = true;
    this.token = localStorage.getItem("token");
    this.access_token = this.token;
    this.authService.GetOpportunitieslist(this.access_token).subscribe(
      (data: any) => {
        this.OpportunityList = data.records;
        this.Showloader = false;
      },
      err => {
        console.log(err);
      }
    )
  };
  GetOpportunityfieldlist() {
    this.token = localStorage.getItem("token");
    this.access_token = this.token;
    this.authService.GetOpportunityfieldlist(this.access_token).subscribe(
      (data: any) => {
        this.OpportunityFieldList = data.records;
      },
      err => {
        console.log(err);
      }
    )
  };
  changedepartmenttype(event: any) {
    this.SmartsheetList = [];
    this.Showloader = true;
    let entry = event.target.value;
    this.fieldtype = event.target.value;
    if (entry == "Software") {
      const res = this.MappingSheetList.filter((x: any) => x.key == 'QuestionSoftware');
      this.sheetId = res[0].values;
    }
    else if (entry == "Networking") {
      const res = this.MappingSheetList.filter((x: any) => x.key == 'QuestionNetworking');
      this.sheetId = res[0].values;
    }
    else {
      const res = this.MappingSheetList.filter((x: any) => x.key == "QuestionDesigning");
      this.sheetId = res[0].values;
    }
    this.authService.getSmartsheetdata(this.sheetId, this.smartsheetaccesstoken).subscribe(
      (data: any) => {
        console.log(data);
        this.SmartsheetList = data;
        for (const formField of this.SmartsheetList) {
          this.myForm.addControl(formField.fieldType + formField.no, new FormControl('', this.getValidator(formField)));
        }
        this.formFields = this.SmartsheetList;
        this.Showloader = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  private getValidator(formField: FormField): ValidatorFn | null {
    switch (formField.validator) {
      case "email":
        return Validators.email;
      case "isRequired":
        return Validators.required;
      default:
        return null;
    }
  }
  previewlist() {
    this.Previewanswerdata = [];
    for (let i = 0; i < this.SmartsheetList.length; i++) {
      this.bodydata = {
        Answer: this.myForm.controls[this.SmartsheetList[i].fieldType + this.SmartsheetList[i].no].value,
        QuestionId: this.SmartsheetList[i].no,
        Question: this.SmartsheetList[i].question,
        FieldType: this.SmartsheetList[i].fieldType,
        Required: this.SmartsheetList[i].isRequired,
        Visible: this.SmartsheetList[i].visible,
      };
      this.Previewanswerdata.push(this.bodydata)
    }
  }
 
  onSubmit(): void {
    if (this.myForm.valid) {
      let value = this.myForm.value;
    }
  }

  bodydata: any;
  formdata: any;
  Submit() {
    if (this.myForm.valid) {
      this.formdata = JSON.stringify(this.myForm.value);
      this.Showloader = true;
      this.Outputanswerdata = [];
      if (this.fieldtype == "Software") {
        const res = this.MappingSheetList.filter((x: any) => x.key == 'AnswerSoftware');
        this.answersheetId = res[0].values;
      }
      else if (this.fieldtype == "Networking") {
        const res = this.MappingSheetList.filter((x: any) => x.key == 'AnswerNetworking');
        this.answersheetId = res[0].values;
      }
      else {
        const res = this.MappingSheetList.filter((x: any) => x.key == 'AnswerDesigning');
        this.answersheetId = res[0].values;
      }
      for (let i = 0; i < this.SmartsheetList.length; i++) {
          this.bodydata = {
            UserId: this.SalesForceUserdetails[0].id,
            Answer: (this.SmartsheetList[i].fieldType == "DateTimePicker" && this.myForm.controls[this.SmartsheetList[i].fieldType + this.SmartsheetList[i].no].value!="") ? formatDate(this.myForm.controls[this.SmartsheetList[i].fieldType + this.SmartsheetList[i].no].value , 'MM-dd-yyyy', 'en-US') : this.myForm.controls[this.SmartsheetList[i].fieldType + this.SmartsheetList[i].no].value,
            QuestionId: this.SmartsheetList[i].no,
            type: this.fieldtype
          };
        this.Outputanswerdata.push(this.bodydata)
      }

      this.authService.UpdateSmartsheetdata(this.answersheetId, this.Outputanswerdata, this.smartsheetaccesstoken).subscribe(
        (data: any) => {
          console.log(data);
          this.Showloader = false;
          if (data.statusCode == 200) {
            // this.stepStates.normal;
            window.alert("Successfully submitted your answers.");
            this.previewlist();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      window.alert("Please fill required fields");
    }
  }
  GetMappingsheetlist() {
    this.authService.getMappingSheetDetails(this.smartsheetaccesstoken).subscribe(
      (data: any) => {
        this.MappingSheetList = data;
        console.log(this.MappingSheetList);
        this.GetSalesforceToken();
      },
      (err) => {
        console.log(err);
      }
    )
  };

}