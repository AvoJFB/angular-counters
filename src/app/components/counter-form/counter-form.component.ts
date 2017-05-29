import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-counter-form',
  templateUrl: './counter-form.component.html',
  styleUrls: ['./counter-form.component.css']
})
export class CounterFormComponent implements OnInit {
  title;

  constructor(private counterService: CounterService, private flashMessage: FlashMessagesService,) { }

  ngOnInit() {
  }

  onSubmitCounter() {
    if (this.title === '') {
      this.flashMessage.show('Pleas fill title field for new counter!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.counterService.createCounter(this.title);
    this.flashMessage.show('Counter added successfully', {cssClass: 'alert-success', timeout: 3000});
    this.title = '';
  }

}
