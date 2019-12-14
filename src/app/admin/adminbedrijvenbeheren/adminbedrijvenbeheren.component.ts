import { Component, OnInit } from '@angular/core';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Opdracht } from 'src/app/models/opdracht.model';

@Component({
  selector: 'app-adminbedrijvenbeheren',
  templateUrl: './adminbedrijvenbeheren.component.html',
  styleUrls: ['./adminbedrijvenbeheren.component.scss']
})
export class AdminbedrijvenbeherenComponent implements OnInit {

  bedrijven: Bedrijf[];
  opdrachten: Opdracht[];
  popup: boolean = false;
  popup2: boolean = false;
  bedrijf: Bedrijf;
  nieuweUser: User;
  title: string = '';

  // USERID NOG KOPPELEN AAN EEN NIEUW BEDRIJF
  constructor(private _bedrijfService: BedrijfService, private _userService: UserService, private router: Router, private _opdrachtenService: OpdrachtService)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_BEDRIJVEN") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getBedrijven();
  }


  onSubmit(){
    if (this.bedrijf.bedrijfID === 0){
      this.nieuweUser.functie = 'Bedrijf';
      console.log("post");
      console.log(this.nieuweUser);
      this._userService.addUser(this.nieuweUser).subscribe(r => {
        this.bedrijf.userID = r.userID;
        console.log('bedrijf: ', this.bedrijf);
        this._bedrijfService.addBedrijf(this.bedrijf).subscribe(result =>{
          this.popup = false;
          this.getBedrijven();
          });
      });
     

    } else {
      console.log("put", this.bedrijf);
      this._bedrijfService.updateBedrijf(this.bedrijf).subscribe(result =>{
        this.popup = false;
        this.getBedrijven();
      });
    }
 }

  getBedrijven(){
    this._bedrijfService.getBedrijven().subscribe(result => {
      this.bedrijven = result;
      console.log('result: ', result);
      this.nieuweUser = new User(0, null, null, null, null);
    });
  }

  closePopup(){
    this.popup = false;
    this.popup2 = false;
  }

  deleteBedrijfPopup(bedrijf: Bedrijf){
    this.bedrijf = bedrijf;
    this._opdrachtenService.getOpdrachtenByBedrijfID(bedrijf.bedrijfID).subscribe(result =>{
      this.opdrachten = result;
      });
    this.popup2 = true;
  }

  deleteBedrijf(id: number){
    this._bedrijfService.deleteBedrijf(id).subscribe(result =>{
      this.popup2 = false;
      this.getBedrijven();
    });
   }

   overzichtBedrijf(id: number){
      this.router.navigate(['admin/bedrijf/' + id]);
   }

   updateBedrijf(bedrijf: Bedrijf){
     this.title = "Wijzigen";
     this.bedrijf = bedrijf;
     console.log(this.bedrijf);
     this.popup = true;
   }

  toevoegenPopup(){
    this.title = "Toevoegen";
    this.popup = true;
    this.bedrijf = new Bedrijf(0, '', '', '', '', 0, null, null);  }

  ngOnInit() {
  }

}
