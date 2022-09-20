import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { LoginService } from 'src/app/services';
import { LogOutRequestDTO } from 'src/app/models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private loginService: LoginService
  ) { }

  public signOut(): void {
    let logOutRequest: LogOutRequestDTO = {userId: this.getUser().id};
    this.loginService.logoutUser(logOutRequest).subscribe({
      next: () => {},
      error: () => {}
    });
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    var token = window.sessionStorage.getItem(TOKEN_KEY);
    return token;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public getIdUser(): number {
    let userId = this.getUser().id;
    return userId;
  }
  
}
