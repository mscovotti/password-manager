import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordCard } from '../password-card';
import { PasswordService } from '../services/password.service';
import { PasswordFormComponent } from './password-form.component';

@Component({
  selector: 'password-card',
  templateUrl: './password-card.component.html',
  styleUrls: ['./password-card.component.css']
})
export class PasswordCardComponent {

  @Input('passwordCard') data: PasswordCard = {
    id: null,
    url: '',
    name: '',
    username: '',
    password: ''
  };
  
  constructor(
    public dialog: MatDialog,
    private passwordService: PasswordService,
  ) {}

  /**
   * Deletes an existing Password Card
   *
   * @param {PasswordCard} passwordCard The Passowrd card to delete
   * @memberof PasswordCardComponent
   */
  delete(passwordCard: PasswordCard): void {
    if (window.confirm('Are you sure you want to delete this password?')) {
      this.passwordService.deletePasswordCard(passwordCard.id as string);
    }
  }

  /**
   * Opens the Password Form dialog with the data to edit
   *
   * @param {PasswordCard} cardData The initial data for the form
   * @memberof PasswordCardComponent
   */
  openEditDialog(cardData: PasswordCard): void {
    this.dialog.open(PasswordFormComponent, {
      width: '350px',
      data: cardData,
    });
  }

}
