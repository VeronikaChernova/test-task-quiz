import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private quizAnswers = new BehaviorSubject<any>(null);
  quizAnswersObs = this.quizAnswers.asObservable();
  private quizQuestions = new BehaviorSubject<any>(null);
  quizQuestionsObs = this.quizQuestions.asObservable();

  constructor() { }


  changeAnswers(obj: any) {
    this.quizAnswers.next(obj);
  }
  changeQuestions(obj: any) {
    this.quizQuestions.next(obj);
  }
}
