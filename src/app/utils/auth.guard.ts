import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      return true; // Allow access to dashboard
    }

    // Redirect to landing page with error message
    this.router.navigate(['/'], { queryParams: { error: 'You must be logged in to access the dashboard.' } });
    return false;
  }
}
