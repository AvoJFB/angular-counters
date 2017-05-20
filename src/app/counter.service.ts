import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CounterService {
  counters = [];

  constructor(private http: Http) {}

  getCounters() {
    return this.http.get('http://localhost:1337/api/counters')
      .map(res => res.json());
  }

  incrementCounter(id, value) {
    const url = `http://localhost:1337/api/counter/${id}/increment/${value}`;
    return this.http.put(url, null);
  }

  decrementCounter(id, value) {
    const url = `http://localhost:1337/api/counter/${id}/decrement/${value}`;
    return this.http.put(url, null);
  }

  createCounter(title, value) {
    const counter = {
      title,
      value,
    };
    return this.http.post('http://localhost:1337/api/counter', counter)
      .map((res) => res.json());
  }

  deleteCounter(id) {
    return this.http.delete(`http://localhost:1337/api/counter/${id}`);
  }

}
