import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('https://localhost:44316/api/review', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  addReview(review: Review) {
    return this.http.post<Review>('https://localhost:44316/api/review', review, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  updateReview(review: Review) {
    return this.http.put<Review>('https://localhost:44316/api/review/' + review.reviewID, review, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  deleteReview(reviewID: number) {
    return this.http.delete<Review>('https://localhost:44316/api/review/' + reviewID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
}
