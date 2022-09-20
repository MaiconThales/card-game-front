import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { environment as e } from 'src/environments/environment.prod';
import { JwtResponseDTO, loginRequestDTO, SignupRequestDTO } from 'src/app/models';
import { AuthServiceService, TokenStorageService, ToolBarService, UserInfoService } from 'src/app/services';
import { MyErrorStateMatcher } from '../../shared/errors/errors.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginCreateComponent } from '../login-create/login-create.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  loginUser!: loginRequestDTO;
  errorMessage = '';
  userInfo!: JwtResponseDTO;

  constructor(
    public dialog: MatDialog,
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userInfoService: UserInfoService,
    private toolBarService: ToolBarService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this.tokenStorage.getToken()) {
      this.router.navigate([e.REDIRECT_DASHBOARD]);
    }
  }

  onSubmit(): void {
    this.loginUser = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.router.navigate([e.REDIRECT_DASHBOARD]);
        this.userInfo = data;
        this.userInfoService.setValueUser(this.userInfo);

        this.toolBarService.emitValueToolBar(true);
      },
      error: err => {
        this.resetForm();
        this.errorMessage = err.message;
        this.snackBar.open( this.translate.instant("LOGIN.INFO_INVALID_LOGIN"), 
                            this.translate.instant("LOGIN.INPUT_OK"), 
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  openDialogCreateUser(): void {
    this.resetForm();

    const dialogRef = this.dialog.open(LoginCreateComponent, {
      width: '500px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.createUser(result);
      }
    });
  }

  createUser(u: SignupRequestDTO): void {
    this.authService.register(u).subscribe({
      next: data => {
        this.snackBar.open( this.translate.instant(data.message), 
                            this.translate.instant("LOGIN.INPUT_OK"),
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
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

  resetForm(): void {
    this.loginForm.reset();
    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].clearValidators();
      this.loginForm.controls[key].updateValueAndValidity();
    }
  }

}
