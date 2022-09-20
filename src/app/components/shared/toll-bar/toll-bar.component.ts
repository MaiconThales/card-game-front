import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment as e } from 'src/environments/environment.prod';
import { JwtResponseDTO } from 'src/app/models';
import { TokenStorageService, ToolBarService, UserInfoService } from 'src/app/services';

@Component({
  selector: 'app-toll-bar',
  templateUrl: './toll-bar.component.html',
  styleUrls: ['./toll-bar.component.scss']
})
export class TollBarComponent implements OnInit {

  showToolBar: boolean = false;
  userLogged: JwtResponseDTO = {
    id: 0,
    email: "",
    language: "",
    roles: [],
    token: "",
    type: "", 
    username: ""
  };
  isShowSideBar: boolean = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userInfoService: UserInfoService,
    private toolBarService: ToolBarService
  ) { }

  ngOnInit(): void {
    this.toolBarService.showToolBar.subscribe(show => {
      this.showToolBar = show;
    });
    this.userInfoService.user.subscribe(u => {
      this.userLogged = u;
    });
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this.tokenStorage.getToken()) {
      this.userLogged = this.tokenStorage.getUser();
      this.userInfoService.setValueUser(this.userLogged);
      this.showToolBar = true;
    }
  }

  logout(): void {
    if (this.isShowSideBar) {
      this.toggleSideNav();
    }
    this.tokenStorage.signOut();
    this.showToolBar = false;
    this.router.navigate([e.REDIRECT_AUTHENTICATION]);
  }

  redirectToDashboard(): void {
    this.router.navigate([e.REDIRECT_DASHBOARD]);
  }

  redirectToMenu(value: number): void {
    switch (value) {
      case 1:
        this.router.navigate([e.REDIRECT_DECK]);
        break;
      default:
        //this.router.navigate([e.REDIRECT_DASHBOARD]);
        break;
    }
  }

  toggleSideNav(): void {
    this.isShowSideBar = !this.isShowSideBar;
  }

}