import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // ACCESS_TOKEN: string ="";
  // REFRESH_TOKEN:  string ="";
  ACCESS_TOKEN: string ="";
  REFRESH_TOKEN:  string ="";
  token :any;
  refreshToken= "";

  constructor(private authService: AuthService,private _router: Router,private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getoauthurl();
  }
  getoauthurl(){
    this.authService.getSmartsheetOauthUrl().subscribe((data: any) => {
      if(data){
       window.location.href=data.Oauthurl;
      }
    });
  }
  getAcessToken(){
    //return this.http.get("http://localhost:4200/callback",httpOptions);

    return this.http.get("http://localhost:4200/ng-wizard",httpOptions);
   // const authCode = req.query;
  }
  // getToken(): string {
  //   return localStorage.getItem(this.ACCESS_TOKEN);
  // }

  // getRefreshToken(): string {
  //   return localStorage.getItem(this.REFRESH_TOKEN);
  // }

  // saveToken(token): void {
  //   localStorage.setItem(this.ACCESS_TOKEN, token);
  // }

  // saveRefreshToken(refreshToken): void {
  //   localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  // }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
    
}
