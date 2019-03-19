import { Component, OnInit } from '@angular/core';
import {AuthService} from './../auth.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Route , Router } from '@angular/router';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  loginForm : FormGroup
  chance = 0;
  constructor(public authService : AuthService, public router : Router) {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('' , [Validators.required, Validators.maxLength(50)]),
      loginPassword: new FormControl ('' , [Validators.required, Validators.maxLength(50)]),
      });
   }

  ngOnInit() {
  }
  loginAdmin() {
  this.authService.loginAdmin(this.loginForm.value).subscribe(res => {
    if (res['message'] === 'Admin Ok') {
      console.log('You win')
     localStorage.setItem('tokenAdmin', res['token'])
     this.router.navigateByUrl('/admin');
     window.location.reload();
    } else {
    if (this.chance < 2){
      this.chance++
      alert('User Not found')
    } else {
       this.router.navigateByUrl('/home');
    }
  }
  });
}
}
