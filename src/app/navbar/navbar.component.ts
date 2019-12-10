import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'ZLANCE';
  isLoggedIn: boolean;

  constructor(private router: Router, private _authenticationService: AuthenticateService ) {
     this._authenticationService.isLoggedin.subscribe(e => {

       if (this._authenticationService.isLoggedin.value == true) {
         this.isLoggedIn = true;
       } else {
         this.isLoggedIn = false;
       }
     });
  }

  ngOnInit() {
  }

  logUit() {
    localStorage.removeItem('token');
    sessionStorage.clear();
     this.isLoggedIn = false;
     this._authenticationService.isLoggedin.next(false);
    this.router.navigate(['logIn'], {replaceUrl: true});
  }

}
