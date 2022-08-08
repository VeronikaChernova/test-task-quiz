import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  private dialogRef: any;
  public questions: {options: any, questions: any[]}[] = [];
  pvqForm: FormGroup = this.formBuilder.group({
    answer0: [''],
    aliases: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required])
    ])
  });
  questionGroups: FormArray = this.formBuilder.array([
    this.formBuilder.control('', [Validators.required])
  ]);
  private subscriptions = new Subscription();
  isChecked= false;
  constructor(public dialog: MatDialog,
              private formBuilder: UntypedFormBuilder,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.questionGroups =
      this.formBuilder.array(this.getQuestions([]).map(question => this.formBuilder.group(question)));
    this.pvqForm = this.formBuilder.group({
      questions: this.questionGroups
    });

    console.log(this.pvqForm);
    this.subscriptions.add(this.dataService.quizQuestionsObs.subscribe(questions => {

      if (questions) {
        this.questionGroups =
          this.formBuilder.array(this.getQuestions(questions).map(question => this.formBuilder.group(question)));

        this.pvqForm = this.formBuilder.group({
          questions: this.questionGroups
        });
        this.cd.markForCheck();
      }
    }));
  }


  getQuestions(questionsInfo: any[]) {
    const questionControlArray: any[] = [];
    questionsInfo.forEach((questionsObj: any) => {
      questionsObj.questions.forEach((question: any, i: number) => {

        const name = questionsObj.options.type.includes('Paragraph') && i === 0 ? `text${i}` : `checkbox${i}`;
        const value = questionsObj.options.type.includes('Paragraph') && i === 0 ? '' : false;
        questionControlArray.push({ [name]: [value,  questionsObj.options.isRequired ? Validators.required : null]});
      });
     });
    console.log({questionControlArray});
    return questionControlArray;
  }

  onAddQuestion() {
    this.dialogRef = this.dialog.open(AddQuestionModalComponent, {});
    this.dialogRef.afterClosed().subscribe((options: any) => {
      if (options) {
        debugger
        const questions = [options.question, ...options.aliases];
        this.questions.push({options, questions});
        console.log('INFO',this.questions);
        this.dataService.changeQuestions(this.questions);
        console.log({options});
      }
    });
  }


  onReviewAnswers(form: any) {
    debugger
    console.log(form.value);
    const result = this.questions.map((question, i) => {
      return {question, answer: Object.values(this.questionGroups.value[i])[0]}
    });
    this.dataService.changeAnswers(result);

    this.router.navigate(['form/answers']);
  }

  getCheckboxName(i: number, questionInfo: any): string {
    return `checkbox${(i + questionInfo.options.type?.includes('Paragraph') ? 1 : 0)}`;
  }
}
