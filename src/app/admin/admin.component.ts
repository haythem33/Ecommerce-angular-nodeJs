import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../product.service';
import { from } from 'rxjs';
import { Route , Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tokenAdmin;
  constructor(public productService: ProductService, public router: Router) {
   }

  ngOnInit() {
    if (localStorage.getItem('tokenAdmin')) {
      this.tokenAdmin = localStorage.getItem('tokenAdmin');
    }

  }
  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
