import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Control } from './../control';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { AuthService } from './../auth.service';
import { PanelService } from './../panel.service';
import { Route , Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
allproduct;
fakePath;
dataSource: MatTableDataSource<any>;
getCategorie;
recherche;
show = 0;
panel;
Token;
  constructor(public productService: ProductService, public authService: AuthService, public panelSerivce: PanelService, public router : Router) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
   this.getCategorie = this.productService.getCategorie();
   this.recherche = this.productService.getRecherce();
    if (this.getCategorie) {
   this.getproductByCategorie(this.getCategorie);
    } else if (this.recherche) {
      this.getproductByFilter(this.recherche);
    } else {
      this.getAll();
    }
 }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getproductByCategorie(f: string) {
    this.productService.getProductByCategorie(f).subscribe(res => {
      this.show = 0
       this.allproduct = res;
       this.datatableFilter(this.allproduct);
    });
  }
  getproductByFilter(f) {
    this.productService.getProductByfilter(f).subscribe(res => {
      console.log(res);
      
      if (res['message'] !== 'no data') {
      this.allproduct = res;
      this.datatableFilter(this.allproduct);
      } else {
        this.show = 1
      }
    });
  }
  datatableFilter(f) {
    this.dataSource = new MatTableDataSource(f);
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObject = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
        if (typeof val !== 'object') {
          returnVal = returnVal + ' ' + val;
        } else if (val !== null) {
          returnVal = returnVal + ' ' + listAsFlatString(val);
        }
      });
  return returnVal.trim().toLowerCase();
};
         return listAsFlatString(data).includes(filterObject);
      };
  }
  getAll() {
    this.productService.getallProduct().subscribe(res => {
      this.show = 0
      this.allproduct = res;
      this.datatableFilter(this.allproduct);
    });
  }
addPanel(f) {
  this.Token = this.authService.decodetoken();
  if (this.Token) {
    const obj = {
      panel : this.Token['data'].panel,
      statut : 'not active',
      product :[{
        productName : f,
        quantite : 1,  
      }]
      };
    this.panelSerivce.addPanelAccount(this.Token['data']._id, obj).subscribe(res => {
      console.log(res);
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
        quantite : 1,  
      }]
      };
      this.panelSerivce.addPanelNoAccount(obj).subscribe(res => {
      console.log(res);
      this.panelSerivce.getPanel(localStorage.getItem('panel')).subscribe(data => {
        console.log(data)
      });
      });
    } else {
      const obj = {
        statut : 'not active',
        product :[{
          productName : f,
          quantite : 1,  
        }]
        };
        this.panelSerivce.addPanelNoAccount(obj).subscribe(res => {
          console.log(res);
          if (res['message'] === 'create panel') {
            localStorage.setItem('panel', res['data']);
            this.panelSerivce.getPanel(localStorage.getItem('panel')).subscribe(data => {
              console.log(data);
            });
          }
        });
    }
  }
}
setIdProduct(f) {
 this.productService.setIdProduct(f);
 this.router.navigateByUrl('/viewproduct')

}
}

