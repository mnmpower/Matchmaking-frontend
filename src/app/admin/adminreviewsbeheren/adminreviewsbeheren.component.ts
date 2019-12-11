import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminreviewsbeheren',
  templateUrl: './adminreviewsbeheren.component.html',
  styleUrls: ['./adminreviewsbeheren.component.scss']
})
export class AdminreviewsbeherenComponent implements OnInit {

  review: Review;
  reviews: Review[];
  popup: boolean = false;


  constructor(private _reviewService: ReviewService)
  {
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
