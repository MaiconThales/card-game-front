import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CardDTO, DeckDTO } from 'src/app/models';

@Component({
  selector: 'app-dialog-view-cards',
  templateUrl: './dialog-view-cards.component.html',
  styleUrls: ['./dialog-view-cards.component.scss']
})
export class DialogViewCardsComponent implements OnInit {

  cards: CardDTO[] = [];
  deck!: DeckDTO;

  constructor(
    public dialogRef: MatDialogRef<DialogViewCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.insertCardsInView();
  }

  insertCardsInView(): void {
    this.deck = this.data;
  }

  editCard(indexElement: number): void {
    this.dialogRef.close(indexElement);
  }

  removeCard(indexElement: number): void {
    this.deck.cards.splice(indexElement, 1);
    this.dialogRef.close(this.deck);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}