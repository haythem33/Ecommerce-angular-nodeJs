import { Component, OnInit } from '@angular/core';
import { PubService } from './../../pub.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  fileUpload: Array<File> = [];
  pub : FormGroup
  constructor(public pubService : PubService) { 
    this.pub = new FormGroup ({
      image : new FormControl('', [Validators.required]),
      lien : new FormControl('', [Validators.required])

    })
  }

  ngOnInit() {
  }
  filechangeEvent(fileInput: any) {
    this.fileUpload = <Array<File>>fileInput.target.files;
  }
  addPub() {
    this.pubService.addPub(this.pub.value).subscribe(res => {
      console.log(res['message']);
    })
  }
  uploadFile() {
    const fba = new FormData();
    fba.append('file', this.fileUpload[0]);
    this.pubService.uploadFile(fba).subscribe(res => {
    })
  }

}
