import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(public http : HttpClient) { }
  api_url : String = environment.api_url;
  uploadFile(file) {
    const headers = new HttpHeaders();
      headers.set('Content-Type', 'form-data');
      return this.http.post(  this.api_url + '/pub/upload', file, {headers} );
  }
  addPub(form) {
    return this.http.post(  this.api_url +  '/pub/add', form);
  }
  getPub() {
    return this.http.get( this.api_url +  '/pub/get')
  }
  deletePub(id) {
    return this.http.get(this.api_url +  `/pub/delete/${id}`);
  }
}
