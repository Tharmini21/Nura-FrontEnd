import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  token: any;
  smartsheetaccesstoken: string = "";
  tokenresponsedata: any = [];
  tokenresponse: any;
  oldtokenresponse: any;
  constructor(private authService: AuthService, private route: ActivatedRoute,private _router: Router) { }

  ngOnInit(): void {
    this.gettokenmethod();
  }
  gettokenmethod() {
    this.route.queryParams.subscribe(params => {
      this.tokenresponsedata = params;
      var authCode = this.tokenresponsedata.code;
      const options = {
        ClientId: "9bc4e7idskvrxwjgngm",
        Code: authCode,
        ClientSecret: "o6zc3rumct6er1jll9n"
      };
      this.authService.getAccessToken(options).subscribe(
        (data: any) => {
          localStorage.removeItem("smartsheettoken");
          localStorage.removeItem("token");
          this.tokenresponse = data;
          this.oldtokenresponse = data;
          var returned_token = {
            "ACCESS_TOKEN": this.tokenresponse.access_token,
            "EXPIRES_IN": (Date.now() + (this.tokenresponse.expires_in * 1000)),
            "REFRESH_TOKEN": this.tokenresponse.refresh_token
          }
          console.log("Token:" + (returned_token.ACCESS_TOKEN));
          this.smartsheetaccesstoken = returned_token.ACCESS_TOKEN;
          localStorage.setItem("smartsheettoken", this.smartsheetaccesstoken);
          localStorage.setItem("smartsheetrefreshtoken", returned_token.REFRESH_TOKEN);
          if(this.smartsheetaccesstoken!='' && this.smartsheetaccesstoken!=undefined){
            this._router.navigate(['/ng-wizard']);
            }
        },
        err => {
          console.log(err);
        });
    })
  }

  RefreshToken() {
    if (Date.now() > this.oldtokenresponse.expires_in) {
      localStorage.removeItem("smartsheettoken");
      localStorage.removeItem("smartsheetrefreshtoken");
      const options = {
        ClientId: "9bc4e7idskvrxwjgngm",
        refresh_token: this.oldtokenresponse.refresh_token,
        ClientSecret: "o6zc3rumct6er1jll9n"
      };
      this.authService.getRefreshAccessToken(options).subscribe(
        (data: any) => {
          this.tokenresponse = data;
          this.oldtokenresponse = data;
          var returned_token = {
            "ACCESS_TOKEN": this.tokenresponse.access_token,
            "EXPIRES_IN": (Date.now() + (this.tokenresponse.expires_in * 1000)),
            "REFRESH_TOKEN": this.tokenresponse.refresh_token
          }
          this.smartsheetaccesstoken = returned_token.ACCESS_TOKEN;
          localStorage.setItem("smartsheettoken", this.smartsheetaccesstoken);
          localStorage.setItem("smartsheetrefreshtoken", returned_token.REFRESH_TOKEN);
        },
        err => {
          console.log(err);
        });
    }
  }
}
