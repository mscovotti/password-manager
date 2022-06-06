import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PasswordCard } from '../password-card';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordCardsUrl = environment.apiEndpoint + '/password-cards';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private passwordsSubject = new BehaviorSubject<PasswordCard[]>([]);
  passwordCardsObservable$: Observable<PasswordCard[]> = this.passwordsSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  /**
   * Fetches password card from the API
   *
   * @memberof PasswordService
   */
  fetchPasswordCards(): void {
    this.http.get<PasswordCard[]>(this.passwordCardsUrl).pipe(
      catchError(this.errorService.handleError<PasswordCard[]>())
    ).subscribe((cards) => this.passwordsSubject.next(cards));
  }

  /**
   * Creates a new password card using the API
   *
   * @param {PasswordCard} data The data of the new password card
   * @memberof PasswordService
   */
  addPasswordCard(data: PasswordCard): void {
    this.http.post<PasswordCard>(this.passwordCardsUrl, data, this.httpOptions).pipe(
      catchError(this.errorService.handleError<PasswordCard>())
    ).subscribe((newData: PasswordCard) => {
      if (!newData) return;

      let passwords = this.passwordsSubject.getValue();
      passwords.push(newData);
      this.passwordsSubject.next(passwords);
    });
  }

  /**
   * Updates a password card using the API
   *
   * @param {PasswordCard} data The new data for the password card
   * @memberof PasswordService
   */
  updatePasswordCard(data: PasswordCard): void {
    this.http.put<PasswordCard>(`${this.passwordCardsUrl}/${data.id}`, data, this.httpOptions).pipe(
      catchError(this.errorService.handleError<PasswordCard>())
    ).subscribe((newData: PasswordCard) => {
      if (!newData) return;

      let passwords = this.passwordsSubject.getValue();
      let idx = passwords.findIndex(pc => pc.id == newData.id);
      if (idx < 0) return;

      passwords.splice(idx, 1, newData);
      this.passwordsSubject.next(passwords);
    });
  }

  /**
   * Deletes a password card using the API
   *
   * @param {string} id The id of the password card to delete
   * @memberof PasswordService
   */
  deletePasswordCard(id: string): void {
    this.http.delete<PasswordCard>(`${this.passwordCardsUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.errorService.handleError<PasswordCard>())
    ).subscribe(_ => {
      let passwords = this.passwordsSubject.getValue();
      let idx = passwords.findIndex(pc => pc.id == id);
      if (idx < 0) return;

      passwords.splice(idx, 1);
      this.passwordsSubject.next(passwords);
    });
  }

}
