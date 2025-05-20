import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RootLayoutComponent } from '../layout/root-layout/root-layout.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-screen',
  imports: [MatButtonModule, MatCardModule, RootLayoutComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  constructor(private router: Router) {}
  onClick() {
    this.router.navigate(['/question']);
  }
}
