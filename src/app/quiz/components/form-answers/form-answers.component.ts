import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit, OnDestroy {
   private subscriptions = new Subscription();
   answers: any[] = [];
  constructor( private dataService: DataService,
               private activatedRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.add(this.dataService.quizAnswersObs.subscribe(answers => {
      if (!answers) {
        return;
      }
      console.log(answers);
      this.answers = answers.map((item: any) => Object.entries(item));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onBack() {
    this.router.navigate(['form/builder']);
  }


  isNotBoolean(value: any): boolean {
     return typeof value !== 'boolean';
  }

  isAnswersNotExist(): boolean {
    return !this.answers.length;
  }
}
