import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './adminoverzicht.component.html',
  styleUrls: ['./adminoverzicht.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_ADMIN-DASHBOARD") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  ngOnInit() {
  }

}
