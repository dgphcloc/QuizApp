import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';

@Component({
  selector: 'app-filter-quiz',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    NgSelectComponent,
  ],
  templateUrl: './filter-quiz.component.html',
  styleUrl: './filter-quiz.component.scss',
})
export class FilterQuizComponent<T> {
  @Input({ required: true }) options: T[] = [];
  @Input() title: string = '';
  selectedValue!: T;
  @Output() onSelectionChange = new EventEmitter<T>();
  handleSelectionChange(selectedValue: T) {
    this.onSelectionChange.emit(selectedValue);
  }
}
