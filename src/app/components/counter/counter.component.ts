import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() counter;

  constructor(private counterService: CounterService) { }

  ngOnInit() {
  }

  onIncrement() {
    this.counterService.incrementCounter(this.counter._id, 1).subscribe(res => this.counter.value = res.counter.value);
  }

  onDecrement() {
    this.counterService.decrementCounter(this.counter._id, 1).subscribe(res => this.counter.value = res.counter.value);
  }

  onDelete() {
    this.counterService.deleteCounter(this.counter);
  }

}
