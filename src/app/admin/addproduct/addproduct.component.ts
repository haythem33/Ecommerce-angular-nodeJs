import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../product.service';
import { from } from 'rxjs';
import { Control } from './../../control';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product: FormGroup;
  fileUpload: Array<File> = [];
  fakePath;
  constructor(public productService: ProductService) {
    this.product = new FormGroup ({
      name : new FormControl ('', [Validators.required]),
      categorie : new FormControl ('', [Validators.required]),
      prix : new FormControl ('', [Validators.required]),
      image : new FormControl ('', [Validators.required]),
      description : new FormControl ('', [Validators.required])

    });
  }

  ngOnInit() {
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  filechangeEvent(fileInput: any) {
    this.fileUpload = <Array<File>>fileInput.target.files;
  }
  uploadFile() {
    const fba = new FormData();
    fba.append('file', this.fileUpload[0]);
    this.productService.uploadFile(fba).subscribe(res => {
    });
  }
  addProduct() {
    this.productService.addProduct(this.product.value).subscribe(res => {
      if (res['message'] === 'add Ok') {
        alert('New Product Added');
      } else {
        alert('erreur');
      }
    });
  }

}
