import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { QuizService, QuizWithAnswers } from '../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RootLayoutComponent } from '../layout/root-layout/root-layout.component';
import { map, tap } from 'rxjs';
import { shuffleArray } from '../helpers/helper';
import { DecodeHtmlPipe } from '../pipe/decode-html.pipe';
import { ResultStoreService } from '../store/result-store.service';
export type Answer = {
  answer: string;
};
@Component({
  selector: 'app-question-screen',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatRadioModule,
    FormsModule,
    RootLayoutComponent,
    DecodeHtmlPipe,
  ],
  templateUrl: './question-screen.component.html',
  styleUrl: './question-screen.component.scss',
})
export class QuestionScreenComponent implements OnInit {
  quizzes: QuizWithAnswers[] = [];
  curentQuestion: number = 0;
  curentAnswer: string | null = null;
  answersList: Answer[] = [];
  startTime!: number;
  constructor(
    private quizService: QuizService,
    private router: Router,
    private resultStore: ResultStoreService
  ) {}
  ngOnInit(): void {
    this.quizService
      .getQuizzes()
      .pipe(
        tap((response) => this.resultStore.setQuizzes(response.results)),
        map(({ results }) =>
          results.map(
            (q): QuizWithAnswers => ({
              ...q,
              answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
            })
          )
        )
      )
      .subscribe((processedQuizzes) => {
        this.quizzes = processedQuizzes;
        console.log(this.quizzes);
      });
    this.startTime = Date.now();
  }
  onAnswerChange(seletedAnswer: string) {
    this.curentAnswer = seletedAnswer;
    // if has answer => push
    this.answersList.push({
      answer: this.curentAnswer,
    });
    // check answer
  }
  // tìm hiểu về ThemePalette
  //For information on applying color variants in M3, see https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
  onNext() {
    if (this.curentAnswer) {
      console.log(this.answersList);
      // clear question and handle next
      this.curentAnswer = null;
      if (this.quizzes.at(this.curentQuestion + 1)) {
        this.curentQuestion += 1;
      } else {
        const endTime = Date.now();
        const timeDuration = endTime - this.startTime;
        const score = this.calculateScore();
        this.resultStore
          .setTime(timeDuration)
          .setScore(score)
          .setAnswersList(this.answersList);
        this.router.navigate(['complete']);
      }
    }
  }

  isCorrectAnswer(answer: string): boolean {
    const correct = this.quizzes.at(this.curentQuestion)?.correct_answer;
    return answer === correct;
  }

  calculateScore(): number {
    return this.quizzes.reduce((total, quiz, index) => {
      return (
        total +
        (quiz.correct_answer === this.answersList.at(index)?.answer ? 1 : 0)
      );
    }, 0);
  }
}
