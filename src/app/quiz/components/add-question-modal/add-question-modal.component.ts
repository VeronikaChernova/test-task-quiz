import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {questionTypeValidator} from "../question-type.directive";

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent implements OnInit {
  public addQuestionForm: FormGroup = this.formBuilder.group({
    type: ['', [Validators.required, questionTypeValidator(/\b(Paragraph|Checkbox list)\b/)]],
    question: ['', Validators.required],
    password: ['', Validators.required],
    firstOption: ['', Validators.required],
    secondOption: ['', Validators.required],
    ownAnswer: [false, Validators.required],
    isRequired: [false, Validators.required],
    aliases: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required])
    ])
  });

  public isOwnAnswer = false;
  public isRequired = false;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddQuestionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {},
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get aliases() {
    return this.addQuestionForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onAddNewQuestion(): void {
    if (this.addQuestionForm.invalid) {
      return;
    }

    console.log(this.addQuestionForm.value);
    this.dialogRef.close(this.addQuestionForm.value);

  }
}