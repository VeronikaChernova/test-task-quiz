import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {questionTypeValidator} from "../question-type.directive";

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent implements OnInit {
  public addQuestionForm: UntypedFormGroup = this.formBuilder.group({
    type: ['', [Validators.required, questionTypeValidator(/\b(Paragraph|Checkbox List| Paragraph Checkbox List)\b/)]],
    question: ['', Validators.required],
    ownAnswer: [false, Validators.required],
    isRequired: [false, Validators.required],
    aliases: this.formBuilder.array([])
  });

  public isOwnAnswer = false;
  public isRequired = false;

  constructor(private formBuilder: UntypedFormBuilder,
              public dialogRef: MatDialogRef<AddQuestionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {},
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get aliases() {
    return this.addQuestionForm.get('aliases') as UntypedFormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onAddNewQuestion(): void {
    if (this.addQuestionForm.invalid) {
      return;
    }
    this.dialogRef.close(this.addQuestionForm.value);

  }

  onChangeType() {
   if ( this.addQuestionForm.value.type.includes('Checkbox List')) {
     this.addAlias();
   }
  }
}
