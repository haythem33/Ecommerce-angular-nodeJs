import { Component, OnInit } from '@angular/core';
import {ContactService} from './../../contact.service';


@Component({
  selector: 'app-getmessage',
  templateUrl: './getmessage.component.html',
  styleUrls: ['./getmessage.component.css']
})
export class GetmessageComponent implements OnInit {
message;
  constructor(public contactService : ContactService) { }

  ngOnInit() {
    this.contactService.getAllContact().subscribe(res => {
      this.message = res;
      console.log(this.message)
    })
  }
delete(f) {
  this.contactService.delete(f).subscribe(res => {
    this.contactService.getAllContact().subscribe(data => {
      this.message = data;
      console.log(this.message)
    })
  })
}

}
