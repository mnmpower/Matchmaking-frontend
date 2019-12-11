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
  functie: string = "";


  constructor(private router: Router, private _authenticationService: AuthenticateService ) {
      this._authenticationService.isLoggedin.subscribe(e => {

        if (e) {
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
    localStorage.removeItem('functie');
    sessionStorage.clear();
     this.isLoggedIn = false;
     this._authenticationService.isLoggedin.next(false);
    this.router.navigate(['logIn'], {replaceUrl: true});
  }

}
