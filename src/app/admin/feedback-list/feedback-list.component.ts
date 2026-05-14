import { Component, inject, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-feedback-list',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent implements OnInit {
  _feedbackService = inject(FeedbackService);
  feedbackList: any[] = [];
  searchControl = new FormControl('');
  ngOnInit(): void {
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => this._feedbackService.getFeedbackList(value ?? '').pipe(
          catchError(() => of([]))
        ))
      ).subscribe(res => {
        this.feedbackList = res;
      });

      // Initial load
      this._feedbackService.getFeedbackList().subscribe(res => {
        this.feedbackList = res;
      })
  }
}
