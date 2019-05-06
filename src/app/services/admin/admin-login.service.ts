import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {

  
  constructor(private http: HttpClient) { }

  validateUser(admin: Admin) {
    const url = `${environment.apiUrl}${environment.serviceContext.adminLogin}/login`;
    return this.http.post<Admin>(url, JSON.stringify(admin),httpOptions);
  }
}
