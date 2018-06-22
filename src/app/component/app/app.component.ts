import {InitService} from '../../service/init.service';
import {ChangeDetectorRef, Component, DoCheck, OnChanges} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {RepositoryService} from '../../service/repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger(
      'fadeInOut', [
        transition(':enter', [
          style({opacity: 0}),
          animate(500, style({opacity: 1}))
        ])
      ]
    )
  ]
})
/**
 * The main application component which includes child components.
 */
export class AppComponent implements DoCheck {

  errorMessage: string;

  // Main loading property
  loading = false;

  constructor(private initService: InitService,
              private notificationService: NotificationService,
              private repositoryService: RepositoryService,
              private cdRef: ChangeDetectorRef) {
  }

  /**
   * Life cycle hook especially for isErrorOccured query.
   * If error occurred loading property changed but the UI not reflect it because it is happened after UI life hook.
   * So need manually fire change detection.
   */
  ngDoCheck() {
    this.cdRef.detectChanges();
  }

  /**
   * Query if the application loaded.
   * @returns {Boolean} True if application initialized. False otherwise.
   */
  get isInitialized(): Boolean {
    return this.initService.isInitialized();
  }

  /**
   * Query error message and if available then display it. If error occurred stop loading state.
   * @returns {boolean} True if error occured. False otherwise.
   */
  get isErrorOccured(): boolean {
    this.errorMessage = this.notificationService.getError();
    const hasError = this.errorMessage !== null;
    if (hasError) {
      this.loading = false;
    }
    return hasError;
  }

  /**
   * Query repository response availability.
   * @returns {boolean} True if repository response available. False otherwise.
   */
  get hasResponse(): boolean {
    return this.repositoryService.getRepositories() !== null;
  }

  /**
   * Close error message if available and user closes it.
   */
  closeError(): void {
    this.notificationService.setError(null);
  }

  /**
   * Child components emit events for loading state purpose.
   * This function intercept it and make appropriate change.
   * @param {boolean} loading - True if loading mask needed. False otherwise.
   */
  loadingEventHandler(loading: boolean) {
    this.loading = loading;
    this.cdRef.detectChanges();
  }

}
