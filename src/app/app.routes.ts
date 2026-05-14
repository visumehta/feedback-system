import { Routes } from '@angular/router';
import { FeedbackFormComponent } from './user/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './admin/feedback-list/feedback-list.component';

export const routes: Routes = [
    // { path: '', component: FeedbackFormComponent}
    { path: '', redirectTo: 'user', pathMatch: 'full'},

    {path: 'user', component: FeedbackFormComponent},
    {path: 'admin', component: FeedbackListComponent}
];
