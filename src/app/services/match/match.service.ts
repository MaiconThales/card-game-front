import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserDTO } from 'src/app/models';
import { environment as e } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private http: HttpClient
  ) { }

  searchMatch(player: UserDTO): Observable<any> {
    return this.http.post(e.AUTH_API + e.MATCH_CONTROLLER + '/search-match', player);
  }

}
