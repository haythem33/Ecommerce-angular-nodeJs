import { Component, OnInit } from '@angular/core';
import { PubService } from './../../pub.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
allpub;
  constructor(public pubService : PubService) { }

  ngOnInit() {
    this.pubService.getPub().subscribe(res => {
      this.allpub = res;
    });
  }
  removeFakePathUrl(f) {
    return f.slice(12, f.length);
 }
 deletePub(f) {
   this.pubService.deletePub(f).subscribe(res => {
   })
   this.pubService.getPub().subscribe(res => {
    this.allpub = res;
   })
 }

}
