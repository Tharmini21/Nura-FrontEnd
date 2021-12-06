import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //form: any = {};
  isLogin: boolean = false
  credentials = {
    username: '',
    password: ''
  }
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  statuslogin: any;
  logininfo: any;
  access_token: string = "";
  token= "";
  constructor(private authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
   // this.getsalesforcelogin();
  }
  // getsalesforcelogin(){
  //   this.authService.login().subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
  onSubmit(form: NgForm) {
    if (form.value.username == "") {
      window.alert(this.usernameAlert);
    }
    else if (form.value.password == "") {
      window.alert(this.passwordAlert);
    }
    else {
      this.authService.login(form.value.username,form.value.password).subscribe(
        (data: any) => {
          this.access_token = data.access_token;
          localStorage.setItem("token",this.access_token);
          if(this.access_token!='' && this.access_token!=undefined){
          this._router.navigate(['/opportunitylist']);
          }
          this.isLogin = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  // reloadPage(): void {
  //   window.location.reload();
  // }
  // logout() {
  //   window.location.reload();
  //   //this._router.navigate(['/login']);
  //   this._router.navigate(['']);
  // }
}




