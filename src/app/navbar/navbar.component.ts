import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'EZ-Match';
  isLoggedIn = false;

  constructor(private router: Router, ) {
    // this._authenticationService.isLoggedin.subscribe(e => {
    //   if (this._authenticationService.isLoggedin.value == true) {
    //     this.isLoggedIn = true;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // });
  }

  ngOnInit() {
  }

  logUit() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    // this.isLoggedIn = false;
    // this._authenticationService.isLoggedin.next(false);
    this.router.navigate(['logIn'], {replaceUrl: true});
  }

}