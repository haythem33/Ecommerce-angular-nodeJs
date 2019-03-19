import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
Token;
  constructor(private http: HttpClient) { }
  api_url: String = environment.api_url;
  decodetoken() {
    if (localStorage.getItem('token')) {
    this.Token = localStorage.getItem('token');
    return jwt_decode(this.Token);
  }
  }
  registerUser(form) {
    return this.http.post(this.api_url +  '/auth/register', form);
  }
  loginUser(form) {
    return this.http.post(this.api_url + '/auth/login', form);
  }
  loginAdmin(form) {
    return this.http.post( this.api_url + '/auth/loginAdmin', form)
  }
}
