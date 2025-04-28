import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthState } from './states/auth.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-events-frontend';

  constructor(private authState: AuthState, private router: Router) { }

  logout() {
    this.authState.logout();
  }

  isLoggedIn() {
    return this.authState.isLoggedIn() && !this.router.url.includes('not-found');
  }

}
