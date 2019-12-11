import { Component, OnInit } from '@angular/core';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';

@Component({
  selector: 'app-adminbedrijvenbeheren',
  templateUrl: './adminbedrijvenbeheren.component.html',
  styleUrls: ['./adminbedrijvenbeheren.component.scss']
})
export class AdminbedrijvenbeherenComponent implements OnInit {

  bedrijven: Bedrijf[];
  popup: boolean = false;
  bedrijf: Bedrijf;

  // USERID NOG KOPPELEN AAN EEN NIEUW BEDRIJF
  constructor(private _bedrijfService: BedrijfService)
  {
    this.getBedrijven();
  }


  onSubmit(){
    if (this.bedrijf.bedrijfID === 0){
      console.log("post")
      this._bedrijfService.addBedrijf(this.bedrijf).subscribe(result =>{
        this.popup = false;
        this.getBedrijven();
      });
    } else {
      console.log("put", this.bedrijf)
      this._bedrijfService.updateBedrijf(this.bedrijf).subscribe(result =>{
        this.popup = false;
        this.getBedrijven();
      });
    }
 }


  getBedrijven(){
    this._bedrijfService.getBedrijven().subscribe(result => {
      this.bedrijven = result;
      console.log('result: ', result)
    });
  }

  closePopup(){
    this.popup = false;
  }

  deleteBedrijf(id: number){
    this._bedrijfService.deleteBedrijf(id).subscribe(result =>{
      this.getBedrijven();
    });
   }

   updateBedrijf(bedrijf: Bedrijf){
     this.bedrijf = bedrijf;
     console.log(this.bedrijf);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.bedrijf = new Bedrijf(0, '', '', '', '', 0);  }

  ngOnInit() {
  }

}
