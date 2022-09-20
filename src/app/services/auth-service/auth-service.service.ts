import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../token-service/token-storage.service';
import { environment as e } from 'src/environments/environment.prod';
import { loginRequestDTO, SignupRequestDTO } from 'src/app/models/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private tokenStorageService: TokenStorageService
  ) { }

  login(userLogin: loginRequestDTO): Observable<any> {
    return this.http.post(e.AUTH_API + e.LOGIN_CONTROLLER + '/auth/signin', userLogin, httpOptions);
  }

  register(userData: SignupRequestDTO): Observable<any> {
    return this.http.post(e.AUTH_API + e.LOGIN_CONTROLLER + '/auth/signup', userData, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(e.AUTH_API + e.LOGIN_CONTROLLER + '/auth/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  isLogged(): Observable<any> {
    return this.http.get(e.AUTH_API + e.LOGIN_CONTROLLER + '/auth/isLogged');
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();

    if(token != undefined) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
  
}
