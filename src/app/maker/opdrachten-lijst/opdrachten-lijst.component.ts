import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Opdracht } from 'src/app/models/opdracht.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opdrachten-lijst',
  templateUrl: './opdrachten-lijst.component.html',
  styleUrls: ['./opdrachten-lijst.component.scss']
})
export class OpdrachtenLijstComponent implements OnInit {

  isLoading: boolean = false;

  opdrachten: Opdracht[];

  constructor(private _opdrachtService: OpdrachtService, private _userService: UserService, private router: Router)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_OPDRACHTEN") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  ngOnInit() {
  }

  doFilter(filter)
  {
    this.isLoading = true;
    console.log("Inside list:", filter);

    this._opdrachtService.getOpdrachtenFilter(filter).subscribe(result => {
      this.opdrachten = result;
      this.isLoading = false;
    });
  }
}
