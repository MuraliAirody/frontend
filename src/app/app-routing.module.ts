import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { HomeComponent as userHome } from './pages/user/home/home.component';

const routes: Routes = [
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
         path:"",
         component:WelcomeComponent,
      },
      {
        path:"profile",
        component:ProfileComponent,
      },
      {
        path:"view-categories",
        component:ViewCategoriesComponent,
      },
      {
        path:"add-category",
        component:AddCategoryComponent,
      },
      {
        path:"view-quizzes",
        component:ViewQuizzesComponent,
      },
      {
        path:"add-quiz",
        component:AddQuizComponent,
      },
      {
        path:"update-quiz/:qId",
        component:UpdateQuizComponent
      },
      {
        path:"view-questions/:qId/:title",
        component:ViewQuestionsComponent
      },
      {
        path:"add-question/:qId/:title",
        component:AddQuestionComponent
      },
      {
        path:"update-question/:quesId",
        component:UpdateQuestionComponent
      }
      
    ]
  },
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    canActivate:[UserGuard],
    children:[
      {
        path:"",
        component:userHome
      },
      {
        path:":cId",
        component:LoadQuizComponent
      },
      {
        path:"instruction/:qId",
        component:InstructionComponent
      }
    ]
  },
  {
    path:"start/:qId",
    component:StartComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
