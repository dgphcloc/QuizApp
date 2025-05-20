import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ResultState = {
  score: number;
  time: number;
};

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private resultSubject = new BehaviorSubject<ResultState>({
    score: 0,
    time: 0,
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

  reset() {
    this.resultSubject.next({ score: 0, time: 0 });
  }
}
