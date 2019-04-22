import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundModule } from './not-found/not-found.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './app-core/route-guard/auth/auth.guard';
import { JwtInterceptor } from './app-core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './app-core/interceptors/error.interceptor';
import { MockBackendInterceptor } from './app-core/services/mock-backend';


@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotFoundModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
