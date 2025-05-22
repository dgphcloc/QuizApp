import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimeToSecondsPipe } from '../pipe/time-to-seconds.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogHistoryAnswerComponent } from '../dialog-history-answer/dialog-history-answer.component';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, TimeToSecondsPipe, MatButtonModule],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultCardComponent {
  @Input() title: string = 'Result';
  @Input() message: string = '';
  @Input() score!: number;
  @Input() time!: number;
  @Output() playAgain = new EventEmitter<void>();
  readonly dialog = inject(MatDialog);
  onClick() {
    this.playAgain.emit();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogHistoryAnswerComponent, {
      height: 'calc(100% - 10px)',
      width: 'calc(100% - 10px)',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
