import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormContainerComponent} from "./quiz/components/form-container/form-container.component";
import {FormBuilderComponent} from "./quiz/components/form-builder/form-builder.component";
import {FormAnswersComponent} from "./quiz/components/form-answers/form-answers.component";

const routes: Routes = [
  { path: 'form', component: FormContainerComponent,
    children: [
      {path: 'builder', component: FormBuilderComponent},
      {path: 'answers', component: FormAnswersComponent}
    ]
  },
  { path: '',   redirectTo: '/form', pathMatch: 'full' },
  { path: '*',   redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
