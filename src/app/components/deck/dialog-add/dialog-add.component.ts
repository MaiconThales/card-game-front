import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DeckDTO } from 'src/app/models';
import { MyErrorStateMatcher } from '../../shared/errors/errors.component';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {

  deckForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm(): void {
    this.deckForm = new FormGroup({
      id: new FormControl(this.data != null ? this.data.id : ''),
      nameDeck: new FormControl(this.data != null ? this.data.nameDeck : '', [Validators.required])
    });
  }

  onSubmit(): void {
    let deck: DeckDTO;
    deck = {
      id: this.deckForm.controls['id'].value,
      nameDeck: this.deckForm.controls['nameDeck'].value,
      cards: []
    }
    this.dialogRef.close(deck);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}