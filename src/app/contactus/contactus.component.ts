import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Customvalidation } from './../customvalidation';
import { from } from 'rxjs';
import { AuthService } from './../auth.service';
import { ContactService } from './../contact.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
contact: FormGroup;
contactLogin: FormGroup;
Token;
  constructor(public authService: AuthService, public contactService: ContactService) {
    this.contact = new FormGroup({
     name : new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
     email : new FormControl ('', [Validators.required, Validators.email]),
     phoneNumber : new FormControl ('', [Validators.required, Customvalidation.checkLimit(10000000, 99999999)]),
     description: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)])
    });
    this.contactLogin = new FormGroup({
      description: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)])
    });

  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.Token = this.authService.decodetoken();
    }
  }
  addContact() {
    this.contactService.sendContact(this.contact.value).subscribe(res => {
      if (res['message'] === 'new contact send') {
        alert('Your message have been sent');
      }
    });
   }
   addContactLogin() {
     const obj = {
       name : this.Token.data.username,
       email : this.Token.data.email,
       phoneNumber : this.Token.data.telephone,
       description : this.contactLogin.value.description
     };
     this.contactService.sendContact(obj).subscribe(res => {
       if (res['message'] === 'new contact send') {
        alert('Your message have been sent');
        }
     });
   }

}
