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
import {  MatExpansionModule} from '@angular/material';
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

const approute: Routes = [
  { path: '', component: LandingComponent},
  { path: 'candidate-login', component: UserAuthComponent },
  { path: 'admin-login', component: AdminAuthComponent},
  { path: 'syllabus', component: SyllybusComponent},
  { path: 'candidate-registration', component: SignupComponent},
  { path: 'admin-dashboard', component: AdminDashbordComponent, children: [
      { path: 'home', component: DashbordHomeComponent },
      { path: 'add-question', component: AddQuestionComponent},
      { path: 'add-coding-question', component: CodingQuestionComponent},
      { path: 'view-question', component: ViewQuestionComponent},
      { path: 'registered-candidate', component: ShowRegisteredCandidateComponent}
    ] },
  { path: 'user', component: InstructionsComponent, children: [
      { path: 'questions', component: QuestionsComponent},
      { path: 'coding-questions', component: CodingQuestionsComponent}
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
    SubmitPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(approute),
    LayoutModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
