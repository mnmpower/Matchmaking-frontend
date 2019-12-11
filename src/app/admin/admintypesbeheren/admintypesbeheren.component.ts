import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/type.model';
import { TypeService } from 'src/app/services/type.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admintypesbeheren',
  templateUrl: './admintypesbeheren.component.html',
  styleUrls: ['./admintypesbeheren.component.scss']
})
export class AdmintypesbeherenComponent implements OnInit {

  type: Type;
  types: Type[];
  popup: boolean = false;


  constructor(private _typeService: TypeService, private _userService: UserService, private router: Router)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_TYPES") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getTypes();
  }


  onSubmit(){
    if (this.type.typeID === 0){
      console.log("post");
      this._typeService.addType(this.type).subscribe(result =>{
        this.popup = false;
        this.getTypes();
      });
    } else {
      console.log("put", this.type);
      this._typeService.updateType(this.type).subscribe(result =>{
        this.popup = false;
        this.getTypes();
      });
    }
 }


 getTypes(){
    this._typeService.getTypes().subscribe(result => {
      this.types = result;
      console.log('result: ', result);
    });
  }

  closePopup(){
    this.popup = false;
  }

  deleteType(id: number){
    this._typeService.deleteType(id).subscribe(result =>{
      this.getTypes();
    });
   }

   updateType(type: Type){
     this.type = type;
     console.log(this.type);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.type = new Type(0, '');
  }



  ngOnInit() {
  }

}
