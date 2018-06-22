import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {httpErrorInterceptor} from './interceptor/HttpErrorInterceptor';

import {AppComponent} from './component/app/app.component';
import {NavbarComponent} from './component/navbar/navbar.component';

import {NotificationService} from './service/notification.service';
import {RepositoryService} from './service/repository.service';
import {InitService} from './service/init.service';
import {GlobalErrorHandler} from './handler/GlobalErrorHandler';
import {FormsModule} from '@angular/forms';
import {BodyComponent} from './component/body/body.component';
import {LoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LoadingModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    httpErrorInterceptor,
    InitService,
    NotificationService,
    RepositoryService
  ],
  bootstrap: [AppComponent]
})
/**
 * Base module of the application.
 */
export class AppModule {

  constructor(private initService: InitService) {
    // After initialization set the flag initialized.
    initService.setInitialized();
  }

}
