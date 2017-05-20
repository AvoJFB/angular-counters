import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../counter.service';

@Component({
  selector: 'counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})

export class CounterListComponent implements OnInit {
  counters;

  constructor(private counterService: CounterService) {
    this.counters = [];
  }

  ngOnInit() {
    this.counterService.getCounters().subscribe(data => this.counters = data);
  }

}
