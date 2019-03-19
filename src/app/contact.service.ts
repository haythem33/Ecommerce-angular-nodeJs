import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
 api_url : String = environment.api_url;
  sendContact(form) {
    return this.http.post(this.api_url +  '/contact/add', form);
  }
  getAllContact() {
    return this.http.get(this.api_url +  '/contact/get');
  }
  delete(id) {
    return this.http.get(this.api_url +  `/contact/delete/${id}`)
  }
}
