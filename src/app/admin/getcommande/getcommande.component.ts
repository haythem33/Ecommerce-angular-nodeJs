import { Component, OnInit } from '@angular/core';
import {PanelService } from './../../panel.service';
import {ProductService} from './../../product.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-getcommande',
  templateUrl: './getcommande.component.html',
  styleUrls: ['./getcommande.component.css']
})
export class GetcommandeComponent implements OnInit {
allProduct;
panel2 = [];
fakePath;
dataSource: MatTableDataSource<any>;
  constructor( public panelService: PanelService, public productService : ProductService) {
    this.dataSource = new MatTableDataSource([]);
   }

  ngOnInit() {
    const obj = {
      statut : 'active',
    }
    this.panelService.getAllPanel(obj).subscribe(res => {
      this.allProduct = res;
      this.datatableFilter(this.allProduct)
    })
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  donePanel(f) {
    const obj1 = {
      statut : 'done',
      }
      const obj2 = {
        statut2 : 'active'
      }
    this.allProduct = null
    this.panelService.PanelDone(f, obj1).subscribe(res => {
    })
    this.panelService.getAllPanel(obj2).subscribe(res => {
      this.allProduct = res;
      this.datatableFilter(this.allProduct)
    })

    
    
  }

}
