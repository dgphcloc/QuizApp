import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../services/quiz.service';
import { Answer } from '../question-screen/question-screen.component';

export type ResultState = {
  score: number;
  time: number;
  quizzes: Quiz[];
  answersList: Answer[];
};
@Injectable({
  providedIn: 'root',
})
export class ResultStoreService {
  private resultSubject = new BehaviorSubject<ResultState>({
    score: 0,
    time: 0,
    quizzes: [],
    answersList: [],
  });

  result$ = this.resultSubject.asObservable();

  setScore(score: number) {
    const current = this.resultSubject.value;
    this.resultSubject.next({ ...current, score });
    return this;
  }

  setTime(time: number) {
    const current = this.resultSubject.value;
    this.resultSubject.next({ ...current, time });
    return this;
  }
  setAnswersList(answersList: Answer[]) {
    const current = this.resultSubject.value;
    this.resultSubject.next({ ...current, answersList });
    return this;
  }
  setQuizzes(quizzes: Quiz[]) {
    const current = this.resultSubject.value;
    this.resultSubject.next({ ...current, quizzes });
    return this;
  }
  reset() {
    this.resultSubject.next({
      score: 0,
      time: 0,
      quizzes: [],
      answersList: [],
    });
  }
}
