import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {
  Quiz,
  QuizCategory,
  QuizDifficulty,
  QuizType,
} from '../services/quiz.service';
import { Answer } from '../question-screen/question-screen.component';
import { ResultStoreService } from '../store/result-store.service';
import { CommonModule, PercentPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterQuizComponent } from '../filter-quiz/filter-quiz.component';
import { map, Observable, of } from 'rxjs';
import { DecodeHtmlPipe } from '../pipe/decode-html.pipe';
import { FormsModule } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export type HistoryAnswer = Quiz & Answer;

class QueryBuilder<
  T extends {
    type: string;
    category: string;
    difficulty: string;
    question: string;
  }
> {
  private data$: Observable<T[]>;
  private typeFilter: string | null = null;
  private categoryFilter: string | null = null;
  private searchFilter: string | null = null;
  private difficultyFilter: string | null = null;
  constructor(data: T[]) {
    this.data$ = of(data);
  }

  withType(type: string): this {
    this.typeFilter = type;
    return this;
  }

  withCategory(category: string): this {
    this.categoryFilter = category;
    return this;
  }

  clearType(): this {
    this.typeFilter = null;
    return this;
  }

  clearCategory(): this {
    this.categoryFilter = null;
    return this;
  }
  withDifficulty(difficulty: string): this {
    this.difficultyFilter = difficulty;
    return this;
  }
  withSearch(keyword: string): this {
    this.searchFilter = keyword?.trim().toLowerCase() || null;
    return this;
  }
  clearSearch(): this {
    this.searchFilter = null;
    return this;
  }
  clearDifficulty(): this {
    this.difficultyFilter = null;
    return this;
  }
  get(): Observable<T[]> {
    return this.data$.pipe(
      map((items) => {
        let result = items;
        if (this.typeFilter !== null) {
          result = result.filter((item) => item.type === this.typeFilter);
        }
        if (this.categoryFilter !== null) {
          result = result.filter(
            (item) => item.category === this.categoryFilter
          );
        }
        if (this.difficultyFilter !== null) {
          result = result.filter(
            (item) => item.difficulty === this.difficultyFilter
          );
        }
        if (this.searchFilter !== null) {
          result = result.filter((item) =>
            item.question.toLowerCase().includes(this.searchFilter!)
          );
        }
        return result;
      })
    );
  }
}

@Component({
  selector: 'app-dialog-history-answer',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FilterQuizComponent,
    DecodeHtmlPipe,
    FormsModule,
  ],
  templateUrl: './dialog-history-answer.component.html',
  styleUrl: './dialog-history-answer.component.scss',
})
export class DialogHistoryAnswerComponent implements OnInit {
  displayedColumns: string[] = [
    'question',
    'category',
    'difficulty',
    'type',
    'correct_answer',
    'answer',
    'status',
  ];
  searchTerm: string = '';
  quizTypes = Object.values(QuizType);
  quizCategories = Object.values(QuizCategory);
  quizDifficultly = Object.values(QuizDifficulty);
  historyAnswers: HistoryAnswer[] = [];
  dataSource = this.historyAnswers;
  historyAnsBuilder: QueryBuilder<HistoryAnswer> | null = null;

  constructor(
    private dialogRef: MatDialogRef<DialogHistoryAnswerComponent>,
    private resultStore: ResultStoreService
  ) {}
  ngOnInit(): void {
    this.resultStore.result$.subscribe((result) => {
      this.historyAnswers = result.quizzes.map((quiz, idx) => ({
        ...quiz,
        answer: result.answersList[idx]?.answer,
      }));

      this.dataSource = this.historyAnswers;
    });
    this.historyAnsBuilder = new QueryBuilder<HistoryAnswer>(
      this.historyAnswers
    );
    this.historyAnsBuilder.get().subscribe((filtered) => {
      this.dataSource = filtered;
    });
  }
  onTypeSelectionChange(selectedValue: string) {
    if (!this.historyAnsBuilder) return;
    if (selectedValue) {
      this.historyAnsBuilder.withType(selectedValue);
    } else {
      this.historyAnsBuilder.clearType();
    }
    this.historyAnsBuilder.get().subscribe((filtered) => {
      this.dataSource = filtered;
    });
  }

  onCategorySelectionChange(selectedValue: string) {
    if (!this.historyAnsBuilder) return;

    if (selectedValue) {
      this.historyAnsBuilder.withCategory(selectedValue);
    } else {
      this.historyAnsBuilder.clearCategory();
    }

    this.historyAnsBuilder.get().subscribe((filtered) => {
      this.dataSource = filtered;
    });
  }

  onDifficultlySelectionChange(selectedValue: string) {
    if (!this.historyAnsBuilder) return;

    if (selectedValue) {
      this.historyAnsBuilder.withDifficulty(selectedValue);
    } else {
      this.historyAnsBuilder.clearDifficulty();
    }

    this.historyAnsBuilder.get().subscribe((filtered) => {
      this.dataSource = filtered;
    });
  }
  onSearchChange() {
    console.log('search', this.searchTerm);
    if (!this.historyAnsBuilder) return;

    if (this.searchTerm.trim()) {
      this.historyAnsBuilder.withSearch(this.searchTerm);
    } else {
      this.historyAnsBuilder.clearSearch();
    }

    this.historyAnsBuilder.get().subscribe((filtered) => {
      this.dataSource = filtered;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
