import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CounterService {
  counters = [];
  API_URL = 'http://localhost:1337/api';

  constructor(private http: Http) {}

  getCounters() {
    return this.http.get(`${this.API_URL}/counters`)
      .map((res) => this.counters = res.json());
  }

  incrementCounter(id, value) {
    const url = `${this.API_URL}/counter/${id}/increment/${value}`;
    return this.http.put(url, null)
      .map((res) => res.json())
      .subscribe((res) => this.counters.find((counter) => counter._id === id).value += value);
  }

  decrementCounter(id, value) {
    const url = `${this.API_URL}/counter/${id}/decrement/${value}`;
    return this.http.put(url, null)
      .map((res) => res.json())
      .subscribe((res) => this.counters.find((counter) => counter._id === id).value -= value);
  }

  createCounter(title, value) {
    const counter = {
      title,
      value,
    };
    return this.http.post(`${this.API_URL}/counter`, counter)
      .map((res) => res.json())
      .subscribe((res) => this.counters.push(res));
  }

  deleteCounter(counter) {
    return this.http.delete(`${this.API_URL}/counter/${counter._id}`)
      .map((res) => res.json())
      .subscribe((res) => this.counters.splice(this.counters.indexOf(counter), 1));
  }

}
