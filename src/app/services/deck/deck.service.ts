import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeckDTO } from 'src/app/models';

import { environment as e } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(
    private http: HttpClient
  ) { }

    getAllDeck(): Observable<any> {
      return this.http.get(`${e.AUTH_API}${e.DECK_CONTROLLER}/list-all-deck`);
    }

    getDeckById(idDeck: number): Observable<any> {
      let param: any = {'idDeck': idDeck};
      return this.http.get(`${e.AUTH_API}${e.DECK_CONTROLLER}/get-id-deck`, {params: param});
    }

    saveDeck(deck:any): Observable<any> {
      return this.http.post(`${e.AUTH_API}${e.DECK_CONTROLLER}/save-deck`, deck);
    }

    delteDeck(idDeck: number): Observable<any> {
      let param: any = {'idDeck': idDeck};
      return this.http.delete(`${e.AUTH_API}${e.DECK_CONTROLLER}/delete-deck`, {params: param});
    }

}
