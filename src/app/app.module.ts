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
import {MatExpansionModule} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DashbordHomeComponent } from './admin-dashbord/pages/dashbord-home/dashbord-home.component';
import { SettengsComponent } from './admin-dashbord/pages/settengs/settengs.component';
import { AddQuestionComponent } from './admin-dashbord/pages/add-question/add-question.component';
import { ShowRegisteredCandidateComponent } from './admin-dashbord/pages/show-registered-candidate/show-registered-candidate.component';
import { CodingQuestionComponent } from './admin-dashbord/pages/coding-question/coding-question.component';
import { ViewQuestionComponent } from './admin-dashbord/pages/view-question/view-question.component';
import { SyllybusComponent } from './user-dashboard/syllybus/syllybus.component';
import { QuestionsComponent } from './userside/questions/questions.component';
import { InstructionsComponent } from './userside/instructions/instructions.component';
import { CodingQuestionsComponent } from './userside/coding-questions/coding-questions.component';
import { SubmitPageComponent } from './userside/submit-page/submit-page.component';
import { UserComponent} from './userside/user.component';
import { FeedbackComponent } from './userside/feedback/feedback.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReviewCodingQuestionComponent } from './admin-dashbord/pages/review-coding-question/review-coding-question.component';
import { AdminResultComponent } from './admin-dashbord/pages/admin-result/admin-result.component';
import { StartExamComponent } from './admin-dashbord/pages/settengs/start-exam/start-exam.component';
import { SubmitQuestionComponent } from './userside/questions/submit-question/submit-question.component';
import { SubmitCodingComponent} from './userside/coding-questions/subit-coding/submit-coding.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminAuthInterceptor } from './service/Admin-Service/admin-auth-interceptor';
import {AdminGuard} from './auth-guard/admin.guard';
import {UserGuard} from './auth-guard/user.guard';
import { ParticlesModule } from 'angular-particle';
import { ToasterModule } from 'angular2-toaster';
import { ForgotPasswordComponent } from './admin-auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin-auth/reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmEqualValidatorDirective } from './registration/confirm-equal-validator.directive';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angular-6-social-login';
import {environment} from '../environments/environment';
import { DashbordComponent } from './userside/dashbord/dashbord.component';
import { ExamAuthComponent } from './userside/exam-auth/exam-auth.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FillFormComponent } from './user-dashboard/fill-form/fill-form.component';
import { ViewResultComponent } from './user-dashboard/view-result/view-result.component';
import { ViewInstructionComponent } from './user-dashboard/view-instruction/view-instruction.component';
import { UserResetPasswordComponent } from './user-dashboard/user-reset-password/user-reset-password.component';
import { UserDashboardHomeComponent } from './user-dashboard/user-dashboard-home/user-dashboard-home.component';
import { ViewApplicationFormComponent } from './user-dashboard/view-application-form/view-application-form.component';
import { UserDbGuard } from './auth-guard/user-db.guard';

const approute: Routes = [
  { path: '', component: LandingComponent},
  { path: 'candidate-login', component: UserAuthComponent },
  { path: 'exam-login', component: ExamAuthComponent},
  { path: 'admin-login', component: AdminAuthComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:token/:id', component: ResetPasswordComponent},
  { path: 'candidate-registration', component: SignupComponent},
  { path: 'registration', component: RegistrationComponent},
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
  { path: 'exam', component: UserComponent , canActivate: [UserGuard] , children: [
      { path: 'instruction', canActivate: [UserGuard], component: InstructionsComponent},
      { path: 'questions', canActivate: [UserGuard], component: QuestionsComponent},
      { path: 'submit-question', canActivate: [UserGuard] , component: SubmitQuestionComponent},
      { path: 'coding-questions', canActivate: [UserGuard], component: CodingQuestionsComponent},
      { path: 'submit-coding', canActivate: [UserGuard], component: SubmitCodingComponent},
      { path: 'feedback', canActivate: [UserGuard], component: FeedbackComponent}
    ]},
    {path: 'user-dashboard', canActivate: [UserDbGuard],component: UserDashboardComponent, children: [
      {path: 'home', canActivate: [UserDbGuard],component: UserDashboardHomeComponent },
      {path: 'syllabus', canActivate: [UserDbGuard],component: SyllybusComponent},
      {path: 'fill-form', canActivate: [UserDbGuard],component: FillFormComponent},
      {path: 'fill-form/edit', canActivate: [UserDbGuard],component: FillFormComponent},
      {path: 'view-instruction', canActivate: [UserDbGuard],component: ViewInstructionComponent},
      {path: 'reset-password', canActivate: [UserDbGuard],component: UserResetPasswordComponent},
      {path: 'view-result', canActivate: [UserDbGuard],component: ViewResultComponent},
      {path: 'view-form', canActivate: [UserDbGuard],component: ViewApplicationFormComponent}
    ]}
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
    SubmitCodingComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    ConfirmEqualValidatorDirective,
    DashbordComponent,
    ExamAuthComponent,
    UserDashboardComponent,
    FillFormComponent,
    ViewResultComponent,
    ViewInstructionComponent,
    UserResetPasswordComponent,
    UserDashboardHomeComponent,
    ViewApplicationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(approute),
    LayoutModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    ParticlesModule,
    MatProgressSpinnerModule,
    ToasterModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true},
      AdminGuard,
      UserGuard,
      UserDbGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
