import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../services/authenticate.service';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { BedrijfService } from '../services/bedrijf.service';
import { MakerService } from '../services/maker.service';
import { Maker } from '../models/maker.model';
import { Admin } from '../models/admin.model';
import { Bedrijf } from '../models/bedrijf.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    title = 'ZLANCE';
    isLoggedIn: boolean;
    isMaker: boolean;
    makerId: number = null;
    isAdmin: boolean;
    adminId: number = null;
    isBedrijf: boolean;
    bedrijfId: number = null;

    constructor(private router: Router, private _authenticationService: AuthenticateService, private _userService: UserService) {
        this._authenticationService.isLoggedin.subscribe(e => {

            if (e) {
                this.isLoggedIn = true;
                console.log('e: ', e);
            } else {
                this.isLoggedIn = false;
            }

            this._userService.getIdOfCurrentUser().subscribe(r => {
                switch (localStorage.getItem('functie')) {
                    case 'Maker':
                        this.isMaker = true;
                        this.isAdmin = false;
                        this.isBedrijf = false;
                        this.makerId = r.valueOf();
                        this.adminId = null;
                        this.bedrijfId = null;
                        break;
                    case 'Admin':
                        this.isMaker = false;
                        this.isAdmin = true;
                        this.isBedrijf = false;
                        this.makerId = null;
                        this.adminId = r.valueOf();
                        this.bedrijfId = null;
                        break;
                    case 'Bedrijf':
                        this.isMaker = false;
                        this.isAdmin = false;
                        this.isBedrijf = true;
                        this.makerId = null;
                        this.adminId = null;
                        this.bedrijfId = r.valueOf();
                        break;
                    default:
                        this.isMaker = false;
                        this.isAdmin = false;
                        this.isBedrijf = false;
                        this.makerId = null;
                        this.adminId = null;
                        this.bedrijfId = null;
                        break;
                }
            });
        });
    }

    ngOnInit() {
    }

    logUit() {
        this.isLoggedIn = false;
        this.isMaker = false;
        this.isAdmin = false;
        this.isBedrijf = false;
        this._authenticationService.isLoggedin.next(false);

        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login'], {replaceUrl: true});
    }

}
