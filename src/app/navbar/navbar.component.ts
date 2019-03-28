import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Route , Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ProductService } from './../product.service';
import { PanelService } from './../panel.service';
import { Customvalidation } from './../customvalidation';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  register: FormGroup;
  loginAlerte;
  categoriesValue: FormGroup;
  Token;
  panel;
  panelNumber = 0;
  fakePath;
  total = 0;
  quantite;
  TokenAdmin;
  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, public authService: AuthService, public productService: ProductService, public panelService: PanelService) {
    this.register = new FormGroup ({
      username: new FormControl('', [Validators.required, Validators.minLength(2) ,  Validators.maxLength(30)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      telephone : new FormControl ('',[Validators.required, Customvalidation.checkLimit(10000000, 99999999)])
    });
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('' , [Validators.required, Validators.maxLength(50)]),
      loginPassword: new FormControl ('' , [Validators.required, Validators.maxLength(50)]),
      });
      this.categoriesValue = new FormGroup ({
        recherche : new FormControl (''),
      });
  }
  ngOnInit() {
    if (localStorage.getItem('tokenAdmin')) {
      this.TokenAdmin = localStorage.getItem('tokenAdmin');
    }
    if (localStorage.getItem('token')) {
      this.Token = this.authService.decodetoken();
    }
    if (localStorage.getItem('panel')) {
      this.panelService.getPanel(localStorage.getItem('panel')).subscribe(res => {
      });
    } else if (this.Token ) {
      this.panelService.getPanel(this.Token['data'].panel).subscribe(res => {
      });
    }
    this.panelService.getPanelSocket().subscribe(res => {
      
      if (res['product']) {
      this.panelNumber = res['product'].length;
      this.panel = [res];
       }
    
  });
}
  registerUser() {
    let obj = {
      username : this.register.value.username,
      email: this.register.value.email,
      password: this.register.value.password,
      telephone : this.register.value.telephone,
      role : 'user'
    }
    this.authService.registerUser(obj).subscribe(res => {
      console.log(res);
     if (res['message'] === 'new User') {
       this.loginAlerte = res['message'];
     }
    });
  }
  loginUser() {
    this.authService.loginUser(this.loginForm.value).subscribe(res => {
     if (res['message'] === 'user ok') {
      localStorage.setItem('token', res['token']);
      this.Token = this.authService.decodetoken();
       if (localStorage.getItem('panel')) {
         const obj = {
           id2 : this.Token['data'].panel,
           id : localStorage.getItem('panel')
         };
         this.panelService.loginPanel(obj, this.Token['data']._id).subscribe(data => {
           if (data['message'] === 'new Panel') {
             localStorage.clear();
             localStorage.setItem('token', data['token'])
           } else {
            localStorage.clear();
            localStorage.setItem('token', res['token']);}
         });
        }
       window.location.reload();
      } else {
       this.loginAlerte = res['message'];
     }
  });
}
  logOut() {
    if (this.Token) {
    localStorage.clear();
    window.location.reload();
    }
  }
  setCategorie() {
    this.productService.setRecherce(this.categoriesValue.value.recherche);
    this.router.navigateByUrl('/product');
   }
   removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  deletePanel(f) {
    if (this.Token) {
    this.panelService.deletePanel(this.Token['data'].panel, f).subscribe(res => {
    });
    this.panelService.getPanel(this.Token['data'].panel).subscribe(res => {
      this.panel = [res]
    });
  } else if (localStorage.getItem('panel')) {
    this.panelService.deletePanel(localStorage.getItem('panel'), f).subscribe(res => {
    });
    this.panelService.getPanel(localStorage.getItem('panel')).subscribe(res => {
      this.panel = [res]
    });
  }
}
CancelCategorie() {
  this.productService.resetCategorie();
 }
}

