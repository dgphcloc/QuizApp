import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Quiz, QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RootLayoutComponent } from '../layout/root-layout/root-layout.component';
import { ResultService } from '../services/result.service';

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
  ],
  templateUrl: './question-screen.component.html',
  styleUrl: './question-screen.component.scss',
})
export class QuestionScreenComponent implements OnInit {
  quizzes: Quiz[] = [];
  answerMap: number[] = [];
  curentQuestion: number = 0;
  curentAnswer: number | null = null;
  public startTime: number = 0;
  constructor(
    private quizService: QuizService,
    private router: Router,
    private resultService: ResultService
  ) {}
  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
      },
      error: () => {},
    });
    this.resultService.reset();
    this.startTime = Date.now();
  }
  onAnswerChange(seletedIndex: number) {
    this.curentAnswer = seletedIndex;
  }
  onNext() {
    if (this.curentAnswer != null) {
      this.answerMap.push(this.curentAnswer);
      this.curentAnswer = null;
      if (this.quizzes.at(this.curentQuestion + 1)) {
        this.curentQuestion += 1;
      } else {
        const score = this.getCorrectAnswerCount(this.quizzes, this.answerMap);
        const endTime = Date.now();
        const durationInSeconds = endTime - this.startTime;
        this.resultService.setScore(score).setTime(durationInSeconds);
        if (score > 5) this.router.navigate(['/congratulations']);
        else this.router.navigate(['/complete']);
      }
    }
  }
  getCorrectAnswerCount(quizzes: Quiz[], answer: number[]) {
    console.log('tính toán');
    const correctAnswerCount = quizzes.reduce((total, quiz, index) => {
      const userAnswer = answer.at(index);
      const isCorrect = quiz.correctAnswerIndex === userAnswer;
      return total + (isCorrect ? 1 : 0);
    }, 0);
    return correctAnswerCount;
  }
}
