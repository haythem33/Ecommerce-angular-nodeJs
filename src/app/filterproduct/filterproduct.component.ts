import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ProductService } from './../product.service';
import { PanelService } from './../panel.service';
import { Customvalidation } from './../customvalidation';

@Component({
  selector: 'app-filterproduct',
  templateUrl: './filterproduct.component.html',
  styleUrls: ['./filterproduct.component.css']
})
export class FilterproductComponent implements OnInit {
  Token;
  fakePath;
  panel2;
  panelNumber;
  totalProduct = [];
  total = 0;
  confirmPanel: FormGroup;
  Quntits = 0;
  constructor(public authService: AuthService, public productService: ProductService, public panelService: PanelService, public router: Router) {
    this.confirmPanel = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Customvalidation.checkLimit(10000000, 99999999)])
    })

  }
  

  ngOnInit() {
    this.getsocket()
    if (localStorage.getItem('token')) {
      this.Token = this.authService.decodetoken();
    }
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  addQuantite(id, index, f) {
    if (f < 20) {
      const obj = {
        productName: id,
        quantite: f + 1
      }
      if (this.Token) {
        this.panelService.updateQuatite(this.Token['data'].panel, index, obj).subscribe(res => {
        });
        this.panelService.getPanel(this.Token['data'].panel).subscribe(res => {
        });
      } else {
        this.panelService.updateQuatite(localStorage.getItem('panel'), index, obj).subscribe(res => {
        });
        this.panelService.getPanel(localStorage.getItem('panel')).subscribe(res => {
        });
      }
    }
  }
  removeQuantite(id, index, f) {
    if (f > 1) {
      const obj = {
        productName: id,
        quantite: f - 1
      }
      if (this.Token) {
        this.panelService.updateQuatite(this.Token['data'].panel, index, obj).subscribe(res => {
        });
        this.panelService.getPanel(this.Token['data'].panel).subscribe(res => {
        });
      } else {
        this.panelService.updateQuatite(localStorage.getItem('panel'), index, obj).subscribe(res => {
        });
        this.panelService.getPanel(localStorage.getItem('panel')).subscribe(res => {
        });
      }
    }
  }
  Total(prix, Q) {
    const obj = prix * Q;
    return obj
  }
  deletePanel(f) {
    if (this.Token) {
      this.panelService.deletePanel(this.Token['data'].panel, f).subscribe(res => {
      });
      this.panelService.getPanel(this.Token['data'].panel).subscribe(res => {
      });
    } else if (localStorage.getItem('panel')) {
      this.panelService.deletePanel(localStorage.getItem('panel'), f).subscribe(res => {
      });
      this.panelService.getPanel(localStorage.getItem('panel')).subscribe(res => {
      });
    }
  }
  getsocket() {
    this.panelService.getPanelSocket().subscribe(res => {
      this.panel2 = null
      if (res['product']) {
        this.panelNumber = res['product'].length;
        this.panel2 = res['product'];
      }
    });
  }
  confirmCommande() {
    if (this.Token) {
      const obj = {
        statut: 'active',
        name: this.Token['data'].username,
        email: this.Token['data'].email,
        telephone: this.Token['data'].telephone
      }
      this.panelService.confirmPanel(this.Token['data'].panel, this.Token['data']._id, obj).subscribe(res => {
        if (res['message'] === "confirm Panel") {
          localStorage.clear();
          localStorage.setItem('token', res['token'])
          alert('your Panel have been sent')
          this.router.navigateByUrl('/product');
          
        }
      })
    } else {
      const obj = {
        statut: 'active',
        name: this.confirmPanel.value.name,
        email: this.confirmPanel.value.email,
        telephone: this.confirmPanel.value.phoneNumber
      }
      this.panelService.confirmPanelNoAccount(localStorage.getItem('panel'), obj).subscribe(res => {
        if (res['message'] === 'confirm Panel') {
          localStorage.clear();
          alert('your Panel have been sent')
          this.router.navigateByUrl('/product');  
        }
      })
    }
  }
  GetAllTotal() {
    let total = 0;
    for (let i = 0; i < this.panel2.length; i++) {
      const product = this.panel2[i];
       total += (product.productName.prix * product.quantite);
    }
    return total;
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
}