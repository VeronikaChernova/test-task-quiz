import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormAnswersComponent } from './components/form-answers/form-answers.component';
import {RouterModule} from "@angular/router";
import { AddQuestionModalComponent } from './components/add-question-modal/add-question-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    FormContainerComponent,
    FormBuilderComponent,
    FormAnswersComponent,
    AddQuestionModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: [
    FormContainerComponent,
    FormBuilderComponent,
    FormAnswersComponent
  ],
  entryComponents: [
    AddQuestionModalComponent
  ]
})
export class QuizModule { }
