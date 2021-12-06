import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseURL = 'http://localhost:15673/api/SmartSheet';
@Injectable()
export class SmartsheetReadWrite {

    constructor(private httpclient: HttpClient) { }
    
    getSmartsheetdata(sheetId: string) {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer vJ8hm3wfYVr4IQ95AmcfFmJvv7UHGjC3RCLJI"
        });
        return this.httpclient.get(`${baseURL}/${sheetId})`, { headers: reqHeader });
    }
    UpdateSmartsheetdata(sheetId: string) {
        let query = JSON.stringify("");
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Basic vJ8hm3wfYVr4IQ95AmcfFmJvv7UHGjC3RCLJI",
            'accept': 'application/json'
        });
        return this.httpclient.put(`${baseURL}/${sheetId}`, query, { headers: reqHeader });
    }
    getopportunites(): Observable<any> {
        return this.httpclient.get(baseURL);
    }
 
    // read(id): Observable<any> {
    //     return this.httpclient.get(`${baseURL}/${id}`);
    // }

    // create(data): Observable<any> {
    //     return this.httpclient.post(baseURL, data);
    // }

    // update(id, data): Observable<any> {
    //     return this.httpclient.put(`${baseURL}/${id}`, data);
    // }
}