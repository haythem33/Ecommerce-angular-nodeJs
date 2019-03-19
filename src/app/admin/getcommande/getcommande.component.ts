import { Component, OnInit } from '@angular/core';
import {PanelService } from './../../panel.service';
import {ProductService} from './../../product.service';

@Component({
  selector: 'app-getcommande',
  templateUrl: './getcommande.component.html',
  styleUrls: ['./getcommande.component.css']
})
export class GetcommandeComponent implements OnInit {
allProduct;
panel2 = [];
fakePath;
  constructor( public panelService: PanelService, public productService : ProductService) { }

  ngOnInit() {
    const obj = {
      statut : 'active',
    }
    this.panelService.getAllPanel(obj).subscribe(res => {
      this.allProduct = res;
    })
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  donePanel(f) {
    const obj1 = {
      statut : 'done',
    }
    const obj2 = {
      statut : 'active',
    }
    this.panelService.PanelDone(f, obj1).subscribe(res => {
    }) 
     this.panelService.getAllPanel(obj2).subscribe(data => {
      this.allProduct = data
     })

    
    
  }

}
