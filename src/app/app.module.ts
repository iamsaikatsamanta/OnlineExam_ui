import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { NavigationComponent } from './admin-dashbord/navigation/navigation.component';
import { PagesComponent } from './admin-dashbord/pages/pages.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule} from '@angular/material';
import { DashbordHomeComponent } from './admin-dashbord/pages/dashbord-home/dashbord-home.component';
import { SettengsComponent } from './admin-dashbord/pages/settengs/settengs.component';
import { AddQuestionComponent } from './admin-dashbord/pages/add-question/add-question.component';
import { ShowRegisteredCandidateComponent } from './admin-dashbord/pages/show-registered-candidate/show-registered-candidate.component';
import { CodingQuestionComponent } from './admin-dashbord/pages/coding-question/coding-question.component';
import { ViewQuestionComponent } from './admin-dashbord/pages/view-question/view-question.component';
import { SyllybusComponent } from './syllybus/syllybus.component';
import { QuestionsComponent } from './userside/questions/questions.component';
import { InstructionsComponent } from './userside/instructions/instructions.component';
import { CodingQuestionsComponent } from './userside/coding-questions/coding-questions.component';
import { SubmitPageComponent } from './userside/submit-page/submit-page.component';
import { UserComponent} from './userside/user.component';
import { FeedbackComponent } from './userside/feedback/feedback.component';
import { ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReviewCodingQuestionComponent } from './admin-dashbord/pages/review-coding-question/review-coding-question.component';
import { AdminResultComponent } from './admin-dashbord/pages/admin-result/admin-result.component';
import { StartExamComponent } from './admin-dashbord/pages/settengs/start-exam/start-exam.component';
import { SubmitQuestionComponent } from './userside/questions/submit-question/submit-question.component';
import { SubmitCodingComponent} from './userside/coding-questions/subit-coding/submit-coding.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminAuthInterceptor } from './service/Admin-Service/admin-auth-interceptor';
import {AdminGuard} from './auth-guard/admin.guard';

const approute: Routes = [
  { path: '', component: LandingComponent},
  { path: 'candidate-login', component: UserAuthComponent },
  { path: 'admin-login', component: AdminAuthComponent},
  { path: 'syllabus', component: SyllybusComponent},
  { path: 'candidate-registration', component: SignupComponent},
  { path: 'admin-dashboard', component: AdminDashbordComponent, canActivate: [AdminGuard], children: [
      { path: 'home', component: DashbordHomeComponent, canActivate: [AdminGuard] },
      { path: 'add-question', component: AddQuestionComponent, canActivate: [AdminGuard]},
      { path: 'add-coding-question', component: CodingQuestionComponent, canActivate: [AdminGuard]},
      { path: 'view-question', component: ViewQuestionComponent, canActivate: [AdminGuard]},
      { path: 'edit-question/:qid' , component: AddQuestionComponent, canActivate: [AdminGuard]},
      { path: 'edit-coding-question/:cqid', component: CodingQuestionComponent, canActivate: [AdminGuard]},
      { path: 'registered-candidate', component: ShowRegisteredCandidateComponent, canActivate: [AdminGuard]},
      { path: 'review-coding-question', component: ReviewCodingQuestionComponent, canActivate: [AdminGuard]},
      { path: 'result', component: AdminResultComponent, canActivate: [AdminGuard]},
      { path: 'settings', component: SettengsComponent, canActivate: [AdminGuard]},
      { path: 'start-exam', component: StartExamComponent, canActivate: [AdminGuard]}
    ] },
  { path: 'user', component: UserComponent , children: [
      { path: 'instruction', component: InstructionsComponent},
      { path: 'questions', component: QuestionsComponent},
      { path: 'submit-question', component: SubmitQuestionComponent},
      { path: 'coding-questions', component: CodingQuestionsComponent},
      { path: 'submit-coding', component: SubmitCodingComponent},
      { path: 'feedback', component: FeedbackComponent}
    ]},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserAuthComponent,
    SignupComponent,
    LandingComponent,
    AdminAuthComponent,
    AdminDashbordComponent,
    NavigationComponent,
    PagesComponent,
    DashbordHomeComponent,
    SettengsComponent,
    AddQuestionComponent,
    ShowRegisteredCandidateComponent,
    CodingQuestionComponent,
    ViewQuestionComponent,
    SyllybusComponent,
    QuestionsComponent,
    InstructionsComponent,
    CodingQuestionsComponent,
    SubmitPageComponent,
    UserComponent,
    FeedbackComponent,
    ReviewCodingQuestionComponent,
    AdminResultComponent,
    StartExamComponent,
    SubmitQuestionComponent,
    SubmitCodingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(approute),
    LayoutModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true},
      AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
