import { Component, OnInit } from '@angular/core';
import { Opdracht } from 'src/app/models/opdracht.model';
import { OpdrachtService } from 'src/app/services/opdracht.service';

@Component({
  selector: 'app-adminopdrachtenbeheren',
  templateUrl: './adminopdrachtenbeheren.component.html',
  styleUrls: ['./adminopdrachtenbeheren.component.scss']
})
export class AdminopdrachtenbeherenComponent implements OnInit {

  opdracht: Opdracht;
  opdrachten: Opdracht[];
  popup: boolean = false;


  constructor(private _opdrachtService: OpdrachtService)
  {
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


 getOpdrachten(){
    this._opdrachtService.getOpdrachten().subscribe(result => {
      this.opdrachten = result;
      console.log('result: ', result);
    });
  }

  closePopup(){
    this.popup = false;
  }

  deleteOpdracht(id: number){
    this._opdrachtService.deleteOpdracht(id).subscribe(result =>{
      this.getOpdrachten();
    });
   }

   updateOpdracht(opdracht: Opdracht){
     this.opdracht = opdracht;
     console.log(this.opdracht);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.opdracht = new Opdracht(0, '', '', '', null, 0, 0, 0);
  }



  ngOnInit() {
  }

}
