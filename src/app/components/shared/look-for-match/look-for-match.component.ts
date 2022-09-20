import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponseDTO, User } from 'src/app/models';

@Component({
  selector: 'app-look-for-match',
  templateUrl: './look-for-match.component.html',
  styleUrls: ['./look-for-match.component.scss']
})
export class LookForMatchComponent implements OnInit {

  @Input() infoUser!: JwtResponseDTO;

  isLookForMatch: boolean = false;
  isDisabledBtnSearcMatch!: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  lookForMatch(): void {
    this.isLookForMatch = true;
    this.isDisabledBtnSearcMatch = true;
  }

  cancelLookForMatch(): void {
    this.isLookForMatch = false;
    this.isDisabledBtnSearcMatch = false;
  }

}
