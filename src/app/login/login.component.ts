import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticateService} from '../services/authenticate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MakerService} from '../services/maker.service';
import {BedrijfService} from '../services/bedrijf.service';
import {AdminService} from '../services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  makerID = 0;
  bedrijfID = 0;
  adminID = 0;

  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Paswoord: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _makerService: MakerService,
    private _bedrijfService: BedrijfService,
    private _adminService: AdminService,
    private _authenticatieService: AuthenticateService
  ) {

  }

  submitted: boolean = false;

  onSubmitLogin() {
    this.submitted = true;
    console.log(this.loginForm.value);
    this._authenticatieService.authenticate(this.loginForm.value).subscribe(result => {
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('functie', result.functie);
      localStorage.setItem('userID', result.userID.toString());

      this._authenticatieService.isLoggedin.next(result.token ? true : false);

      switch (result.functie) {
        case 'Maker':
          this._makerService.getMakerbyUserID(result.userID).subscribe(r => {
            this.makerID = r.makerID;
            console.log("makerID in authenticate functie", r);
            this.router.navigate(['maker/dashboard/' + this.makerID], {replaceUrl: true});
          });
          break;
        case 'Admin':
          this._adminService.getAdminByUserID(result.userID).subscribe(r => {
              this.adminID = r.adminID;
            this.router.navigate(['admin/overzicht/' + this.adminID], {replaceUrl: true});
            }
          );
          break;
        case 'Bedrijf':
          this._bedrijfService.getBedrijfByUserID(result.userID).subscribe(r =>{
            this.bedrijfID = r.bedrijfID;
            this.router.navigate(['bedrijf/dashboard/' + this.bedrijfID], {replaceUrl: true});
          });
          break;
      }

    


    });
  }


  ngOnInit() {

  }

}
