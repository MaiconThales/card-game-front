import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { environment as e } from '../../../../environments/environment.prod';
import { SignupRequestDTO } from 'src/app/models';
import { MyErrorStateMatcher } from '../../shared/errors/errors.component';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss']
})
export class LoginCreateComponent {

  userCreateForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  language: string[] = e.LANGUAGE_OPTIONS;

  constructor(
    public dialogRef: MatDialogRef<LoginCreateComponent>
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userCreateForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      language: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    let user: SignupRequestDTO = {
      username: this.userCreateForm.get('username')?.value,
      password: this.userCreateForm.get('password')?.value,
      email: this.userCreateForm.get('email')?.value,
      language: this.userCreateForm.get('language')?.value
    }
    this.dialogRef.close(user);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
