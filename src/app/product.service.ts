import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
categorie: any;
recherce: any;
IdProduct;
  constructor(public http: HttpClient) { }
  api_url : String = environment.api_url
  uploadFile(file) {
    const headers = new HttpHeaders();
      headers.set('Content-Type', 'form-data');
      return this.http.post( this.api_url +  '/product/upload', file, {headers} );
  }
  addProduct(form) {
    return this.http.post(this.api_url +  '/product/add', form);
  }
  getallProduct() {
    return this.http.get(this.api_url +  '/product/get');
  }
  getProductByCategorie(f) {
    return this.http.get( this.api_url +  `/product/get/${f}`);
  }
  setCategorie(f) {
  this.categorie = f;
    
  }
  getCategorie() {
    return this.categorie;
  }
  setRecherce(f) {
    this.recherce = f;
  }
   getRecherce() {
     return this.recherce;
    }
    getProductByfilter(form) {
      return this.http.get(this.api_url +  `/product/getbyFilter/${form}`);
    }
    getProductById(id) {
      return this.http.get(this.api_url +  `/product/getById/${id}`);
    }
    resetCategorie() {
      this.categorie = null
      this.recherce = null
    }
    setIdProduct(f) {
    this.IdProduct = f
    }
    getIdProduct() {
      return this.IdProduct;
    }
}
