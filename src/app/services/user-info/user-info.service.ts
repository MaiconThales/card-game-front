import { EventEmitter, Injectable } from '@angular/core';

import { JwtResponseDTO } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = new EventEmitter<JwtResponseDTO>();

  constructor() { }

  setValueUser(u: JwtResponseDTO): void {
    this.user.emit(u);
  }
  
}
