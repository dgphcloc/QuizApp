import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimeToSecondsPipe } from '../pipe/time-to-seconds.pipe';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [MatCardModule, TimeToSecondsPipe, MatButtonModule],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.scss',
})
export class ResultCardComponent {
  @Input() title: string = 'Result';
  @Input() message: string = '';
  @Input() score!: number;
  @Input() time!: number;

  @Output() playAgain = new EventEmitter<void>();

  onClick() {
    this.playAgain.emit();
  }
}
