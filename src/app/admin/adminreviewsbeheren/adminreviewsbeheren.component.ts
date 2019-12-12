import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { MakerService } from 'src/app/services/maker.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { Maker } from 'src/app/models/maker.model';

@Component({
  selector: 'app-adminreviewsbeheren',
  templateUrl: './adminreviewsbeheren.component.html',
  styleUrls: ['./adminreviewsbeheren.component.scss']
})
export class AdminreviewsbeherenComponent implements OnInit {

  review: Review;
  reviews: Review[];
  bedrijven: Bedrijf[];
  makers: Maker[];
  popup: boolean = false;
  disableButton: boolean = false;


  constructor(private _reviewService: ReviewService, private _userService: UserService, private router: Router
    , private _bedrijfService: BedrijfService, private _makerService: MakerService)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_REVIEWS") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getReviews();
  }

  getBedrijven(){
    this._bedrijfService.getBedrijven().subscribe(result => {
      this.bedrijven = result;
      
    });
  }

  getMakers(){
    this._makerService.getMakers().subscribe(result => {
      this.makers = result;
    });
  }


  onSubmit(){
    if (this.review.reviewID === 0){
      console.log("post")
      this._reviewService.addReview(this.review).subscribe(result =>{
        this.popup = false;
        this.getReviews();
      });
    } else {
      console.log("put", this.review);
      this._reviewService.updateReview(this.review).subscribe(result =>{
        this.popup = false;
        this.getReviews();
      });
    }
 }

 checkValue(checkDropdown: number){
   console.log(checkDropdown);
   if (checkDropdown == 0) {
     this.disableButton = true;
   } else {
     this.disableButton = false;
   }
   console.log(this.disableButton);
 }


 getReviews(){
    this._reviewService.getReviews().subscribe(result => {
      this.reviews = result;
      console.log('result: ', result);
      this.getBedrijven();
      this.getMakers();
    });
  }

  closePopup(){
    this.popup = false;
  }

  deleteReview(id: number){
    this._reviewService.deleteReview(id).subscribe(result =>{
      this.getReviews();
    });
   }

   updateReview(review: Review){
     this.review = review;
     console.log(this.review);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.review = new Review(0, '', 0, 0, 0);
  }



  ngOnInit() {
  }

}
