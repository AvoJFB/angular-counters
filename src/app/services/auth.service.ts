import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/users/register', user, {headers})
      .map(res => res.json());
  }

  loginUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/users/login', user, {headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/users/profile', {headers})
      .map(res => res.json());
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  isLoggedIn() {
    return tokenNotExpired('id_token');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
