import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
TokenAdmin;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('tokenAdmin')) {
      this.TokenAdmin = localStorage.getItem('tokenAdmin');
    }
  }

}
