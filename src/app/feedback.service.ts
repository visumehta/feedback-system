import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  http = inject(HttpClient);

  apiUrl = 'http://localhost:3000/feedback';

  addFeedback(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getFeedbackList(query: string = '', ratings: number | null = null) {
    let params: any = {};

    if(query) {
      params.query = query;
    }

    if(ratings !== null && ratings !== undefined) {
      params.ratings = ratings;
    }

    console.log(params);
    
    // return this.http.get<any[]>(this.apiUrl + `?q=${query}`);
    return this.http.get<any[]>(this.apiUrl, {params});
  }
}
