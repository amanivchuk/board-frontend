import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {SharedModule} from './main/shared/shared.module';
import {AuthorizationInterceptor} from './main/shared/authorization.interceptor';


registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
