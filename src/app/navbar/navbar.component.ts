import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../services/authenticate.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    title = 'ZLANCE';
    isLoggedIn: boolean;
    isMaker: boolean;
    isAdmin: boolean;
    isBedrijf: boolean;


    constructor(private router: Router, private _authenticationService: AuthenticateService) {
        this._authenticationService.isLoggedin.subscribe(e => {

            if (e) {
                this.isLoggedIn = true;
                console.log('e: ', e);
            } else {
                this.isLoggedIn = false;
            }

            switch (localStorage.getItem('functie')) {
                case 'Maker':
                    this.isMaker = true;
                    this.isAdmin = false;
                    this.isBedrijf = false;
                    break;
                case 'Admin':
                    this.isMaker = false;
                    this.isAdmin = true;
                    this.isBedrijf = false;
                    break;
                case 'Bedrijf':
                    this.isMaker = false;
                    this.isAdmin = false;
                    this.isBedrijf = true;
                    break;
            }
        });
    }

    ngOnInit() {
    }

    logUit() {
        sessionStorage.clear();
        localStorage.clear();
        this.isLoggedIn = false;
        this.isMaker = false;
        this.isAdmin = false;
        this.isBedrijf = false;
        this._authenticationService.isLoggedin.next(false);
        this.router.navigate(['login'], {replaceUrl: true});
    }

}
