import { Component, Output, EventEmitter } from '@angular/core';
import { CounterService } from '../../../counter.service';

@Component({
  selector: 'counter-form',
  templateUrl: 'counter-form.component.html',
  styleUrls: ['counter-form.component.css']
})

export class CounterFormComponent {
  title;

  constructor(private counterService: CounterService) {}

  onSubmit() {
    this.counterService.createCounter(this.title, 0);
    this.title = '';
  }
}
