import { Component, Input } from '@angular/core';
import { CounterService } from '../../counter.service';

@Component({
  selector: 'counter-item',
  templateUrl: './counter-item.component.html',
  styleUrls: ['./counter-item.component.css']
})

export class CounterItemComponent {
  @Input() counter;

  constructor(private counterService: CounterService) {}

  onIncrement() {
    this.counter.value += 1;
    this.counterService.incrementCounter(this.counter._id, 1).subscribe((res) => console.log(res));
  }

  onDecrement() {
    this.counter.value -= 1;
    this.counterService.decrementCounter(this.counter._id, 1).subscribe((res) => console.log(res));
  }

  onDelete() {
    this.counterService.deleteCounter(this.counter._id).subscribe((res) => console.log(res));
  }
}
