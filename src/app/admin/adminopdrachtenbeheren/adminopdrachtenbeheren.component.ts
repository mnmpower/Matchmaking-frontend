import { Component, OnInit } from '@angular/core';
import { Opdracht } from 'src/app/models/opdracht.model';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/models/status.model';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-adminopdrachtenbeheren',
  templateUrl: './adminopdrachtenbeheren.component.html',
  styleUrls: ['./adminopdrachtenbeheren.component.scss']
})
export class AdminopdrachtenbeherenComponent implements OnInit {

  opdracht: Opdracht;
  opdrachten: Opdracht[];
  statussen: Status[];
  bedrijven: Bedrijf[];
  popup: boolean = false;
  popup2: boolean = false;
  disableButton: boolean = false;


  constructor(private _opdrachtService: OpdrachtService, private _userService: UserService, private router: Router
    , private _bedrijfService: BedrijfService, private _statusService: StatusService)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_OPDRACHTEN") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getOpdrachten();
  }


  onSubmit(){
    if (this.opdracht.opdrachtID === 0){
      console.log("post")
      this._opdrachtService.addOpdracht(this.opdracht).subscribe(result =>{
        this.popup = false;
        this.getOpdrachten();
      });
    } else {
      console.log("put", this.opdracht)
      this._opdrachtService.updateOpdracht(this.opdracht).subscribe(result =>{
        this.popup = false;
        this.getOpdrachten();
      });
    }
 }

 checkValue(checkDropdown: number){
   if (checkDropdown == 0) {
     this.disableButton = true;
   } else {
     this.disableButton = false;
   }
 }

 getBedrijven(){
  this._bedrijfService.getBedrijven().subscribe(result => {
      this.bedrijven = result;
      console.log("bedrijven: ", this.bedrijven);
  });
 }

 getStatussen(){
  this._statusService.getStatussen().subscribe(result => {
      this.statussen = result;
      console.log("statussen: ", this.statussen);
  });
 }


 getOpdrachten(){
    this._opdrachtService.getOpdrachten().subscribe(result => {
      this.opdrachten = result;
      this.getBedrijven();
      this.getStatussen();
      console.log('result: ', result);
    });
  }

  closePopup(){
    this.popup = false;
    this.popup2 = false;
  }

  deleteOpdrachtPopup(opdracht: Opdracht){
    this.opdracht = opdracht;
    this.popup2 = true;
  }
  
  deleteOpdracht(id: number){
    this._opdrachtService.deleteOpdracht(id).subscribe(result =>{
      this.getOpdrachten();
    });
    this.popup2 = false;
   }

   updateOpdracht(opdracht: Opdracht){
     this.opdracht = opdracht;
     console.log(this.opdracht);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.opdracht = new Opdracht(0, '', '', '', null, 0, 0, 0, null, null);
  }



  ngOnInit() {
  }

}
