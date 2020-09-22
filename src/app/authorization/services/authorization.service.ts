import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthorizationResponseJWT, UserAuthorizationJWT} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthorizationService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(userAuthorization: UserAuthorizationJWT): Observable<any> {
    return this.http.post(`http://localhost:8082/authentication/login`, userAuthorization)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['/authorization', 'login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {

    const message = error.error;
    switch (message) {
      case 'INVALID_CREDENTIALS':
        this.error$.next('Невернвый логин');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Невеонвый email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Невеонвый пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FbAuthorizationResponseJWT | null) {
    if (response) {
      localStorage.setItem('token', 'Bearer ' + response.token);
      localStorage.setItem('token-exp', response.expiration);
    } else {
      localStorage.clear();
    }
  }
}
