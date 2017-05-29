import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class CounterService {
  counters = [];

  constructor(private http: Http, private authService: AuthService) {}

  getCounters() {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/counters', {headers})
      .map((res) => this.counters = res.json().counters);
  }

  incrementCounter(id, value) {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http.put(`api/counter/${id}/increment/${value}`, null, {headers})
      .map((res) => res.json());
  }

  decrementCounter(id, value) {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http.put(`api/counter/${id}/decrement/${value}`, null, {headers})
      .map((res) => res.json());
  }

  createCounter(title, value?) {
    const counter = {
      title,
      value,
    };

    const headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http.post(`api/counter`, counter, {headers})
      .map((res) => res.json())
      .subscribe((res) => this.counters.push(res.counter));
  }

  deleteCounter(counter) {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`api/counter/${counter._id}`, {headers})
      .map((res) => res.json())
      .subscribe((res) => this.counters.splice(this.counters.indexOf(counter), 1));
  }

}
