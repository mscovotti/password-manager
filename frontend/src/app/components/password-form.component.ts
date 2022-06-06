import { Component, Inject, OnInit } from '@angular/core';
import { PasswordCard } from '../password-card';
import { PasswordService } from '../services/password.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../../shared/url-validator.directive';

@Component({
  selector: 'password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  passwordForm = new FormGroup({
    url: new FormControl('', [Validators.required, urlValidator]),
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  hidePassword = true;

  constructor(
    private passwordService: PasswordService,
    public dialogRef: MatDialogRef<PasswordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordCard
  ) {}

  ngOnInit(): void {
    this.passwordForm.setValue({
      url: this.data.url,
      name: this.data.name,
      username: this.data.username,
      password: this.data.password
    });
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  /**
   * Closes the Password Form dialog
   *
   * @memberof PasswordFormComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Gets the error message for form controls
   *
   * @param {string} controlName The name of the form control
   * @return {string} 
   * @memberof PasswordFormComponent
   */
  getErrorMessage(controlName: string): string {
    if (this.passwordFormControl[controlName].hasError('required')) {
      return 'A value is required';
    }

    return this.passwordFormControl[controlName].hasError('invalidUrl') ? 'Not a valid URL' : '';
  }

  /**
   * Creates or updates an existing Password Card with the data loaded in the form using the PasswordService.
   *
   * @memberof PasswordFormComponent
   */
  save(): void {
    this.passwordForm.setValue({
      url: this.passwordFormControl['url'].value.trim(),
      name: this.passwordFormControl['name'].value.trim(),
      username: this.passwordFormControl['username'].value.trim(),
      password: this.passwordFormControl['password'].value.trim()
    });
    if (this.data.id) {
      this.passwordService.updatePasswordCard({...this.passwordForm.value, id: this.data.id});
    } else {
      this.passwordService.addPasswordCard(this.passwordForm.value);
    }
    this.passwordForm.reset();
    this.closeDialog();
  }

}
