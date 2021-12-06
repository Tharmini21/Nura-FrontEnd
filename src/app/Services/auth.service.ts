import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Url } from 'url';

const baseURL = 'http://localhost:5000/api/SmartSheet'
const SaleforcebaseURL = 'http://localhost:5000/api/Salesforce'

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
});
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username:string,password:string) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      ClientId: '3MVG9pRzvMkjMb6mrgmgbAvqPIvI.e4EcAOWxALXkcl2fFORpDpzmcNipCiYV59NroIsAApFFHJJvIplUBVWF',
      ClientSecret: '85B5B9C835B2883BB0710ED7C9FFEE5116D215EF0BE06E0793058016892E41FE',
      Username: username,
      Password: password
      // Username: 'tharminijagadeesan21@gmail.com',
      // Password: 'Salesforce@7821'
    };
   return this.http.post(SaleforcebaseURL + '/login', body, { headers: reqHeader });
    //return this.http.post(SaleforcebaseURL + '/login', body, httpOptions);
  }
  GetOpportunitiesField(Departmenttype: string, access_token: string) {
    return this.http.post(SaleforcebaseURL + '/GetalltheOpportunities?type=' + Departmenttype + '&token=' + access_token, httpOptions);
    //return this.http.post(baseURL + '/GetalltheOpportunities', body, { headers: reqHeader });
  }
  GetOpportunityfieldlist(token: string) {
    return this.http.post(SaleforcebaseURL + '/GetOpportunityfieldlist?token=' + token, httpOptions);
  }
  GetOpportunitieslist(token: string) {
    return this.http.post(SaleforcebaseURL + '/GetOpportunities?token=' + token, httpOptions);
  }
  getSmartsheetdata(sheetId: string,smartsheettoken: string) {
    return this.http.post(baseURL + '/GetSmartDatas?id=' + sheetId + '&Smartsheettoken=' + smartsheettoken, httpOptions);
  }
  UpdateSmartsheetdata(sheetId: string, bodydata: any,smartsheettoken: string) {
    // let data = JSON.stringify(bodydata);
    let data = JSON.stringify({ id: sheetId, item: bodydata,Smartsheettoken:smartsheettoken });
    return this.http.post(baseURL + '/SaveSmartsheetdata', data, httpOptions);
    //return this.http.post(baseURL + '/SaveSmartsheetdata?id='+sheetId+'&item='+data,httpOptions);
    // return this.http.post(baseURL + '/SaveSmartsheetdata?id='+sheetId,bodydata,httpOptions);
  }
  getMappingSheetDetails(token: string) {
    return this.http.post(baseURL + '/GetMappingSheetDetails?Smartsheettoken='+ token, httpOptions);
  }
  getSmartsheetOauthUrl() {
    return this.http.post(baseURL + '/Smartsheet/Oauth', httpOptions);
  }
  // getAcessToken(){
  //   return this.http.get("http://localhost:4200/ng-wizard",httpOptions);
  // }
  getAccessToken(bodydata: any){
    // let data = JSON.stringify({item: bodydata });
    // return this.http.post(SaleforcebaseURL + '/login', body, { headers: reqHeader });
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(baseURL + '/GetAccessToken',bodydata, { headers: reqHeader });
  }
  getRefreshAccessToken(bodydata: any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(baseURL + '/GetRefreshAccessToken',bodydata, { headers: reqHeader });
  }
  GetSalesforceuserdetails(username: string, token: string) {
    return this.http.post(SaleforcebaseURL + '/GetUserdetails?token=' + token + '&username=' + username, httpOptions);
  }
}