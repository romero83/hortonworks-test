import {ChangeDetectorRef, Injectable} from '@angular/core';

@Injectable()
/**
 * Notification service for store error message and serve if its needed.
 */
export class NotificationService {

  private _errorMessage: string = null;

  constructor() {
  }

  getError(): string {
    return this._errorMessage;
  }

  setError(message: string): void {
    this._errorMessage = message;
    console.error(message);
  }

}
