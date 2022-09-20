import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LogOutRequestDTO } from 'src/app/models';
import { environment as e } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  logoutUser(logOutRequest: LogOutRequestDTO): Observable<any> {
    return this.http.post(e.AUTH_API + e.LOGIN_CONTROLLER + '/auth/logout', logOutRequest);
  }
}
