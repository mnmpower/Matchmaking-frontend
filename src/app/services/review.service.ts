import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
      return this.http.get<Review[]>("https://localhost:44316/api/review");
  }

  addReview(review: Review) {
      return this.http.post<Review>("https://localhost:44316/api/review", review);
  }

  updateReview(review: Review) {
      return this.http.put<Review>("https://localhost:44316/api/review/" + review.reviewID, review);
  }

  deleteReview(reviewID: number) {
      return this.http.delete<Review>("https://localhost:44316/api/review/" + reviewID);
  }
}
