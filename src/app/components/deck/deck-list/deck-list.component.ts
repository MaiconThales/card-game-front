import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { environment as e } from 'src/environments/environment.prod';
import { DeckDTO } from 'src/app/models';
import { DeckService, TokenStorageService } from 'src/app/services';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { DialogAddCardComponent } from '../dialog-add-card/dialog-add-card.component';
import { DialogViewCardsComponent } from '../dialog-view-cards/dialog-view-cards.component';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'options'];
  dataSource!: MatTableDataSource<DeckDTO>;
  decks: DeckDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    public dialog: MatDialog,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.verifyAdminRole();
    if(this.isAdmin) {
      this.getDecks();
    } else {
      this.router.navigate([e.REDIRECT_DASHBOARD]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDecks(): void {
    this.deckService.getAllDeck().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.decks = data;
      },
      error: () => {}
    });
  }

  openDialogRegister(object: any): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '500px',
      height: '180px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.saveDeck(result);
      }
    });
  }

  openDialogCardRegister(type: number, obj: DeckDTO, index: any): void {
    const dialogRef = this.dialog.open(DialogAddCardComponent, {
      width: '500px',
      height: '250px',
      data: {
        deck: obj,
        indexCard: index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        switch(type) {
          case 1:
            obj.cards.push(result);
            break;
          case 2:
            obj.cards[index] = result;
            break;
        }
        this.saveDeck(obj);
      }
    });
  }

  openDialogViewCard(obj: DeckDTO): void {
    const dialogRef = this.dialog.open(DialogViewCardsComponent, {
      width: '1000px',
      height: '800px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {//edit
        if(result.nameDeck == undefined) {
          this.openDialogCardRegister(2, obj, result);
        } else {//delete
          this.saveDeck(result);
        }
      }
    });
  }

  saveDeck(obj: DeckDTO): void {
    this.deckService.saveDeck(obj).subscribe({
      next: data => {
        this.snackBar.open( this.translate.instant(data.message), 
                            this.translate.instant("LOGIN.INPUT_OK"),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
        this.getDecks();
      },
      error: err => {
        this.snackBar.open( this.translate.instant(err.error.message), 
                            this.translate.instant("LOGIN.INPUT_OK"),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  deleteDeck(idDeck: number): void {
    this.deckService.delteDeck(idDeck).subscribe({
      next: data => {
        this.snackBar.open( this.translate.instant(data.message), 
                            this.translate.instant("LOGIN.INPUT_OK"),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
        this.getDecks();
      },
      error: err => {
        this.snackBar.open( this.translate.instant(err.error.message), 
                            this.translate.instant("LOGIN.INPUT_OK"),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

}