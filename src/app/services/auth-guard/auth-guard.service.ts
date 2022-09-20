import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthServiceService } from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(
    public authService: AuthServiceService,
    public router: Router,
  ) { }

  canLoad(): Observable<boolean> | boolean {
    let result = this.authService.isLogged().pipe(
      map(() => {
        if(this.authService.isAuthenticated()) {
          return true;
        }
        return false;
      })
    );
    return result;
  }

  canActivate(): Observable<boolean> | boolean {
    let result = this.authService.isLogged().pipe(
      map(() => {
        if(this.authService.isAuthenticated()) {
          return true;
        }
        return false;
      })
    );
    return result;
  }
  
}
