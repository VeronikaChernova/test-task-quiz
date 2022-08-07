import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  private dialogRef: any = null;

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddQuestion() {
    this.dialog.open(AddQuestionModalComponent, {});
    this.dialogRef.afterClosed().subscribe((options: any) => {
      if (options) {

      }
    });
  }
}
