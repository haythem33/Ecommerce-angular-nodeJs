import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Route , Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ProductService } from './../product.service';
import { PubService } from './../pub.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProduct;
  constructor(public router: Router, public authService: AuthService, public productService: ProductService, public pubService : PubService) {
  }

  ngOnInit() {
    this.pubService.getPub().subscribe(res => {
      this.allProduct = res
    })

  }
setCategorie(f: string) {
 this.productService.setCategorie(f);
 this.router.navigateByUrl('/product');
}
removeFakePathUrl(f) {
  return f.slice(12, f.length);
}


}
