import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../counter.service';

@Component({
  selector: 'counter-app',
  templateUrl: './counter-app.component.html',
  styleUrls: ['./counter-app.component.css']
})

export class CounterAppComponent implements OnInit {
  counters = [];

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.counterService.getCounters().subscribe((counters) => this.counters = counters);
  }
}
