import { Component, OnInit } from '@angular/core';
import {PanelService } from './../../panel.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  allProduct 
  fakePath;
  constructor( public panelService : PanelService) { }

  ngOnInit() {
    const obj = {
      statut : 'done'
    }
    this.panelService.getHistory(obj).subscribe(res => {
      this.allProduct = res
      console.log(this.allProduct)
    })
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }

}
