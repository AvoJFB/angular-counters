import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter-item',
  templateUrl: './counter-item.component.html',
  styleUrls: ['./counter-item.component.css']
})

export class CounterItemComponent {
  @Input() counter;
  @Output() increment = new EventEmitter;
  @Output() decrement = new EventEmitter;
  @Output() delete = new EventEmitter;

  onIncrement() {
    this.increment.emit();
  }

  onDecrement() {
    this.decrement.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
