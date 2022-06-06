import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Shows an error message as a snackBar
   *
   * @template T
   * @return {(error: any) => Observable<T>} 
   * @memberof ErrorService
   */
  handleError<T>(): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      this._snackBar.open(error.error.message || error.statusText, 'Error', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2 * 1000
      });

      return EMPTY;
    };
  }

}