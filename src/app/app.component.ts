import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smartsheet-readwrite';
  isLogin: boolean = false;
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  access_token: string = "";
  OpportunityFieldList:any;
  OpportunityList: any;
  SmartsheetList: any;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
  }
  reloadPage(): void {
    window.location.reload();
  }
  logout() {
    window.location.reload();
    this.router.navigate(['']);
  }

}
