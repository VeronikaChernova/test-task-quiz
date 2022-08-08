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
    text0: [''],
    checkbox1: false,
    checkbox2: false,
    aliases: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required])
    ])
  });
  checkboxesForm: FormGroup = this.formBuilder.group({
    checkbox0: false,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false
  });
  questionGroups: FormArray = this.formBuilder.array([
    this.formBuilder.control('', [Validators.required])
  ]);
  checkboxesGroups: FormArray = this.formBuilder.array([
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
      if (!this.questions && questions) {
        this.questions = questions
      }
      if (questions) {
        this.pvqForm.reset();
        this.questionGroups =
          this.formBuilder.array(this.getQuestions(questions).map(question => this.formBuilder.group(question)));

        this.pvqForm = this.formBuilder.group({
          questions: this.questionGroups
        });
        // this.cd.markForCheck();
      }
    }));
  }


  getQuestions(questionsInfo: any[]) {
    const questionControlArray: any[] = [];
    questionsInfo.forEach((questionsObj: any) => {
      questionsObj.questions.forEach((question: any, i: number) => {

        const name = questionsObj.options.type.includes('Paragraph') && i === 0 ? `text${i}` : `checkbox${i}`;
        const value = questionsObj.options.type.includes('Paragraph') && i === 0 ? '' : false;
        if (name.includes('text')) {
          questionControlArray.push({[name]: [value, questionsObj.options.isRequired ? Validators.required : null], checkboxes: this.checkboxesForm});
        }
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

    // this.router.navigate(['form/answers']);
  }

  getCheckboxName(i: number, questionInfo: any): string {
    const additionalIndex: number = questionInfo.options.type?.includes('Paragraph') ? 1 : 0;
    return `checkbox${i + additionalIndex}`;
  }
}
