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
    maker: Maker = null;
    isAdmin: boolean;
    admin: Admin = null;
    isBedrijf: boolean;
    bedrijf: Bedrijf = null;
    id: number = 0;


    constructor(private router: Router, private _authenticationService: AuthenticateService, private _userService: UserService, private _adminService: AdminService, private _bedrijfService: BedrijfService, private _makerService: MakerService) {
        this._authenticationService.isLoggedin.subscribe(e => {

            if (e) {
                this.isLoggedIn = true;
                console.log('e: ', e);
            } else {
                this.isLoggedIn = false;
            }

            this._userService.getIdOfCurrentUser().subscribe(r => {
                this.id = r.valueOf();
            });

            switch (localStorage.getItem('functie')) {
                case 'Maker':
                    this.isMaker = true;
                    this.isAdmin = false;
                    this.isBedrijf = false;
                    this._makerService.getMaker(this.id).subscribe(r => {
                        this.maker = r;
                    });
                    break;
                case 'Admin':
                    this.isMaker = false;
                    this.isAdmin = true;
                    this.isBedrijf = false;
                    this._adminService.getAdmin(this.id).subscribe(r => {
                        this.admin = r;
                    });
                    break;
                case 'Bedrijf':
                    this.isMaker = false;
                    this.isAdmin = false;
                    this.isBedrijf = true;
                    this._bedrijfService.getBedrijf(this.id).subscribe(r => {
                        this.bedrijf = r;
                    });
                    break;
            }
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
