import { Component } from '@angular/core';
import { RootLayoutComponent } from '../layout/root-layout/root-layout.component';
import { ResultService, ResultState } from '../services/result.service';
import { TimeToSecondsPipe } from '../pipe/time-to-seconds.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ResultCardComponent } from '../result-card/result-card.component';

@Component({
  selector: 'app-complete',
  imports: [
    RootLayoutComponent,
    MatCardModule,
    MatButtonModule,
    ResultCardComponent,
  ],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss',
})
export class CompleteComponent {
  public result!: ResultState;
  constructor(private resultService: ResultService, private router: Router) {}
  ngOnInit(): void {
    this.resultService.result$.subscribe((result) => {
      console.log(result);
      this.result = result;
    });
  }

  onClick() {
    this.router.navigate(['/question']);
  }
}
