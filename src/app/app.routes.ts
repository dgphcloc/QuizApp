import { Routes } from '@angular/router';
import { QuestionScreenComponent } from './question-screen/question-screen.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { CompleteComponent } from './complete/complete.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'question', component: QuestionScreenComponent },
  { path: 'congratulations', component: CongratulationsComponent },
  { path: 'complete', component: CompleteComponent },
];
