import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PasswordCard } from './password-card';
import { PasswordFormComponent } from './components/password-form.component';
import { PasswordService } from './services/password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  passwordCards$: Observable<PasswordCard[]>;

  searchText = '';

  constructor(
    public dialog: MatDialog, 
    private passwordService: PasswordService
  ) {
    this.passwordCards$ = this.passwordService.passwordCardsObservable$;
  }

  ngOnInit(): void {
    this.passwordService.fetchPasswordCards();
  }

  /**
   * Opens a Password Form dialog to create a new Password Card
   *
   * @param {PasswordCard} cardData The initial data for the form
   * @memberof AppComponent
   */
  openEditDialog(cardData: PasswordCard): void {
    this.dialog.open(PasswordFormComponent, {
      width: '350px',
      data: cardData,
    });
  }


}
