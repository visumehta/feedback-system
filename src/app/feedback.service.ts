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
}
