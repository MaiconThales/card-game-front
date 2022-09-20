import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  showToolBar = new EventEmitter<boolean>();

  constructor() { }

  emitValueToolBar(value: boolean): void {
    this.showToolBar.emit(value);
  }

}