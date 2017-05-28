import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-my-counters',
  templateUrl: './my-counters.component.html',
  styleUrls: ['./my-counters.component.css']
})
export class MyCountersComponent implements OnInit {
  counters = [];

  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.counterService.getCounters().subscribe(counters => this.counters = counters);
  }

}
