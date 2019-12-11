import { Component, OnInit } from '@angular/core';
import { MakerService } from 'src/app/services/maker.service';
import { Maker } from 'src/app/models/maker.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmakersbeheren',
  templateUrl: './adminmakersbeheren.component.html',
  styleUrls: ['./adminmakersbeheren.component.scss']
})
export class AdminmakersbeherenComponent implements OnInit {

  maker: Maker;
  makers: Maker[];
  popup: boolean = false;


  // FIX USERID NOG BIJ HET AANMAKEN VAN DE MAKER
  constructor(private _makerService: MakerService, private _userService: UserService, private router: Router)
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
      console.log("post")
      this._makerService.addMaker(this.maker).subscribe(result =>{
        this.popup = false;
        this.getMakers();
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

  closePopup(){
    this.popup = false;
  }

  deletemaker(id: number){
    this._makerService.deleteMaker(id).subscribe(result =>{
      this.getMakers();
    });
   }

   updatemaker(maker: Maker){
     this.maker = maker;
     console.log(this.maker);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.maker = new Maker(0, '', '', '', '', '', '', '', 0);
  }

  ngOnInit() {
  }

}
