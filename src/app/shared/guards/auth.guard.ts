// src/app/shared/guards/auth.guard.ts

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@abp/ng.core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      return true; // Giriş yaptıysa, yönlendirmeye izin ver
    } else {
      this.authService.navigateToLogin(); // ABP'nin login yönlendirmesi
      return false; // Erişim engellendi
    }
  }
}
