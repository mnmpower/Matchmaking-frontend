import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminreviewsbeheren',
  templateUrl: './adminreviewsbeheren.component.html',
  styleUrls: ['./adminreviewsbeheren.component.scss']
})
export class AdminreviewsbeherenComponent implements OnInit {

  review: Review;
  reviews: Review[];
  popup: boolean = false;


  constructor(private _reviewService: ReviewService, private _userService: UserService, private router: Router)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("CRUD_REVIEWS") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getReviews();
  }


  onSubmit(){
    if (this.review.reviewID === 0){
      console.log("post")
      this._reviewService.addReview(this.review).subscribe(result =>{
        this.popup = false;
        this.getReviews();
      });
    } else {
      console.log("put", this.review)
      this._reviewService.updateReview(this.review).subscribe(result =>{
        this.popup = false;
        this.getReviews();
      });
    }
 }


 getReviews(){
    this._reviewService.getReviews().subscribe(result => {
      this.reviews = result;
      console.log('result: ', result);
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
