import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { AuthService } from './../auth.service';
import { PanelService } from './../panel.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
id;
product;
fakePath;
quantite = 1;
Token;
  constructor(public productService : ProductService, public panelSerivce: PanelService, public authService : AuthService) { }

  ngOnInit() {
   this.id = this.productService.getIdProduct()
   this.productService.getProductById(this.id).subscribe(res => {
     this.product = [res];
   })
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  addQuantite() {
    if (this.quantite < 20) {
    this.quantite++;
    }
  }
  removeQuantite() {
    if (this.quantite > 1) {
    this.quantite--;
    }
  }
  addPanel(f) {
    this.Token = this.authService.decodetoken();
    if (this.Token) {
      const obj = {
        statut : 'not active',
        panel : this.Token['data'].panel,
        product :[{
          productName : f,
          quantite : this.quantite,  
        }]
        };
      this.panelSerivce.addPanelAccount(this.Token['data']._id, obj).subscribe(res => {
        
        this.panelSerivce.getPanel(this.Token['data'].panel).subscribe(data => {
        });
        if (res['message'] === 'create Panel') {
          localStorage.clear();
          localStorage.setItem('token', res['token']);
       
        }
      });
    } else {
      if (localStorage.getItem('panel')) {
        const obj = {
        statut : 'not active',
        panel : localStorage.getItem('panel'),
        product :[{
          productName : f,
          quantite : this.quantite,  
        }]
        };
        this.panelSerivce.addPanelNoAccount(obj).subscribe(res => {
        
        this.panelSerivce.getPanel(localStorage.getItem('panel')).subscribe(data => {
          
        });
        });
      } else {
        const obj = {
          statut : 'not active',
          product :[{
            productName : f,
            quantite : this.quantite,  
          }]
          };
          this.panelSerivce.addPanelNoAccount(obj).subscribe(res => {
            
            if (res['message'] === 'create panel') {
              localStorage.setItem('panel', res['data']);
              this.panelSerivce.getPanel(localStorage.getItem('panel')).subscribe(data => {
                
              });
            }
          });
      }
    }
  }

}
