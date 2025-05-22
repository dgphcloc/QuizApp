import { Component, OnInit } from '@angular/core';
import { RootLayoutComponent } from '../layout/root-layout/root-layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TimeToSecondsPipe } from '../pipe/time-to-seconds.pipe';
import { Router } from '@angular/router';
import { ResultCardComponent } from '../result-card/result-card.component';
import { ResultState, ResultStoreService } from '../store/result-store.service';

@Component({
  selector: 'app-congratulations',
  imports: [
    RootLayoutComponent,
    MatCardModule,
    MatButtonModule,
    ResultCardComponent,
  ],
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss',
})
export class CongratulationsComponent implements OnInit {
  public result!: ResultState;
  constructor(
    private resultStore: ResultStoreService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.resultStore.result$.subscribe((result) => {
      console.log(result);
      this.result = result;
    });
  }

  onClick() {
    this.router.navigate(['/question']);
  }
}
