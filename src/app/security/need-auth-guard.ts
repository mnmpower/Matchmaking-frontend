import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticateService} from '../services/authenticate.service';
import {UserService} from '../services/user.service';
import {timer} from 'rxjs';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  makerID = 0;
  ingelogdeMakerID = 0;

  constructor(
    private authenticateService: AuthenticateService,
    private userService: UserService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {


  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.authenticateService.isLogged().subscribe((r: number) => {
      this.ingelogdeMakerID = r;
    });

    const redirectUrl = route['_routerState']['url'];

    console.log('validating...');
    await this.delay(500);


    var splitted = redirectUrl.toString().split('/');
    var length = splitted.length;

    this.makerID = parseInt(splitted[length - 1]);

    console.log(this.ingelogdeMakerID);
    console.log(this.makerID);
    if (this.ingelogdeMakerID === this.makerID) {
      console.log('TRUE');
      return true;
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['forbidden'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );
    return false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
