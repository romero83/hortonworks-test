import {ChangeDetectorRef, ErrorHandler, Injectable} from '@angular/core';
import {NotificationService} from '../service/notification.service';

@Injectable()
/**
 * Global error handler to capture typical errors from the code in runtime and push it to a shared service.
 */
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private notificationService: NotificationService) {
  }

  handleError(error) {
    const message = error.message ? error.message : error.toString();
    this.notificationService.setError(message);
  }

}
