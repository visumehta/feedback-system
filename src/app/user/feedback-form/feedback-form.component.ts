import { AfterViewInit, Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../feedback.service';
import { catchError, exhaustMap, finalize, fromEvent, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-feedback-form',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent implements AfterViewInit {
  fb = inject(FormBuilder);
  _feedbackService = inject(FeedbackService);
  destroyRef = inject(DestroyRef);
  @ViewChild('submitBtn') submitBtn!: ElementRef;
  loading = false;
  message = '';
  errMsg = '';

  feedbackForm = this.fb.group({
    name: ['', Validators.required],
    ratings: [null, Validators.required],
    comment: ['', [Validators.required, Validators.minLength(5)]]
  })

  // onSubmit() {
  //   if(this.feedbackForm.valid) {
  //     console.log(this.feedbackForm.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  ngAfterViewInit(): void {
      fromEvent(this.submitBtn.nativeElement, 'click').pipe(
        // ✅ Auto unsubscribe (no DestroyRef needed manually)
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.loading = true),
        exhaustMap(() => {
          if(this.feedbackForm.invalid) {
            this.loading = false;
            return of(null); // Return an observable that emits null if the form is invalid
          }

          return this._feedbackService.addFeedback(this.feedbackForm.value).pipe(
            catchError(err => {
              console.log('Error:', err);
              return of(null);
            }),
            finalize(() => this.loading = false)
          )
        })
      ).subscribe(res => {
        if(res) {
          console.log('Feedback submitted successfully:', res);
          this.message = 'Feedback submitted successfully!';
          this.feedbackForm.reset();
        } else {
          this.errMsg = 'Failed to submit feedback. Please check the form and try again.';
        }
      })
  }

}
