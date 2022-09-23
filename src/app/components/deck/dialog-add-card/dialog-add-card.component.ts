import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CardDTO } from 'src/app/models';
import { MyErrorStateMatcher } from '../../shared/errors/errors.component';

@Component({
  selector: 'app-dialog-add-card',
  templateUrl: './dialog-add-card.component.html',
  styleUrls: ['./dialog-add-card.component.scss']
})
export class DialogAddCardComponent implements OnInit {

  cardForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogAddCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    if (this.data.indexCard != undefined) { //Edit
      this.cardForm = new FormGroup({
        id: new FormControl(this.data.deck.cards[this.data.indexCard].id),
        nameCard: new FormControl(this.data.deck.cards[this.data.indexCard].nameCard, [Validators.required]),
        damage: new FormControl(this.data.deck.cards[this.data.indexCard].damage, [Validators.required]),
        life: new FormControl(this.data.deck.cards[this.data.indexCard].life, [Validators.required]),
      });
    } else { //Add
      this.cardForm = new FormGroup({
        id: new FormControl(this.data != null ? this.data.deck.id : ''),
        nameCard: new FormControl(this.data != null ? this.data.deck.nameCard : '', [Validators.required]),
        damage: new FormControl(this.data != null ? this.data.deck.damage : undefined, [Validators.required]),
        life: new FormControl(this.data != null ? this.data.deck.life : undefined, [Validators.required]),
       });
    }
  }

  onSubmit(): void {
    let card: CardDTO;
    card = {
      id: this.cardForm.controls['id'].value,
      nameCard: this.cardForm.controls['nameCard'].value,
      damage: this.cardForm.controls['damage'].value,
      life: this.cardForm.controls['life'].value
    }
    this.dialogRef.close(card);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}