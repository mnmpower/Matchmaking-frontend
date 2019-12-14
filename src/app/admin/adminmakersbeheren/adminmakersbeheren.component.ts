import { Component, OnInit } from '@angular/core';
import { MakerService } from 'src/app/services/maker.service';
import { Maker } from 'src/app/models/maker.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Opdracht } from 'src/app/models/opdracht.model';

@Component({
  selector: 'app-adminmakersbeheren',
  templateUrl: './adminmakersbeheren.component.html',
  styleUrls: ['./adminmakersbeheren.component.scss']
})
export class AdminmakersbeherenComponent implements OnInit {

  maker: Maker;
  makers: Maker[];
  opdrachten: Opdracht[];
  popup: boolean = false;
  popup2: boolean = false;
  nieuweUser: User;
  title: string = '';


  // FIX USERID NOG BIJ HET AANMAKEN VAN DE MAKER
  constructor(private _makerService: MakerService, private _userService: UserService, private router: Router, private _opdrachtenService: OpdrachtService)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_MAKERS") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getMakers();
  }


  onSubmit(){
    if (this.maker.makerID === 0){
      this.nieuweUser.functie = 'Maker';
      console.log("post");
      console.log(this.nieuweUser);
      this._userService.addUser(this.nieuweUser).subscribe(r => {
        this.maker.userID = r.userID;
        console.log('maker: ', this.maker);
        this._makerService.addMaker(this.maker).subscribe(result => {
          this.popup = false;
          this.getMakers();
          });
      });
    } else {
      console.log("put", this.maker)
      this._makerService.updateMaker(this.maker).subscribe(result =>{
        this.popup = false;
        this.getMakers();
      });
    }
 }


 getMakers(){
    this._makerService.getMakers().subscribe(result => {
      this.makers = result;
      console.log('result: ', result);
    });
  }

  overzichtMaker(id: number){
    this.router.navigate(['admin/maker/' + id]);
  }

  closePopup(){
    this.popup = false;
    this.popup2 = false;
  }

  deleteMakerPopup(maker: Maker){
    this.maker = maker;
    this._opdrachtenService.getOpdrachtenByMakerID(maker.makerID).subscribe(result =>{
    this.opdrachten = result;
    });
    this.popup2 = true;
  }

  deleteMaker(id: number){
    this._makerService.deleteMaker(id).subscribe(result =>{
      this.getMakers();
    });
    this.popup2 = false;
   }

   updateMaker(maker: Maker){
    this.title = "Wijzigen";
     this.maker = maker;
     console.log(this.maker);
     this.popup = true;
   }

  toevoegenPopup(){
    this.title = "Toevoegen";
    this.popup = true;
    this.maker = new Maker(0, '', '', '', '', '', '', '', 0, null);
    this.nieuweUser = new User(0, '', '', '', '');
  }

  ngOnInit() {
  }

}
