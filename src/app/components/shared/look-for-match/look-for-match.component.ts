import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtResponseDTO, UserDTO, MatchDTO } from 'src/app/models';
import { MatchService } from 'src/app/services';
import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-look-for-match',
  templateUrl: './look-for-match.component.html',
  styleUrls: ['./look-for-match.component.scss']
})
export class LookForMatchComponent implements OnInit, OnDestroy {

  @Input() infoUser!: JwtResponseDTO;

  isLookForMatch: boolean = false;
  isDisabledBtnSearcMatch!: boolean;
  findMatch!: MatchDTO;
  id: any = 0;

  constructor(
    private router: Router,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.id) {
      this.isLookForMatch = false;
      this.isDisabledBtnSearcMatch = false;
      clearInterval(this.id);
    }
  }

  lookForMatch(): void {
    this.isLookForMatch = true;
    this.isDisabledBtnSearcMatch = true;

    let user: UserDTO = {
      id: this.infoUser.id
    }
    this.id = setInterval(() => {
      this.matchService.searchMatch(user).subscribe({
        next: () => {
          this.router.navigate([e.REDIRECT_BOARD]);
          this.cancelLookForMatch();
        },
        error: err => {
          this.ngOnDestroy();
        }
      });
    }, 5000);
  }

  cancelLookForMatch(): void {
    this.ngOnDestroy();
  }

}