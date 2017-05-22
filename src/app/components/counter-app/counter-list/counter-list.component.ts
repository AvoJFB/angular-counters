import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-list',
  templateUrl: 'counter-list.component.html',
  styleUrls: ['counter-list.component.css']
})

export class CounterListComponent {
  @Input() counters;
}
