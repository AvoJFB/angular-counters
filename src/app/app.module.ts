import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterFormComponent } from './components/counter-form/counter-form.component';
import { CounterItemComponent } from './components/counter-item/counter-item.component';
import { CounterListComponent } from './components/counter-list/counter-list.component';

import { CounterService } from './components/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    CounterFormComponent,
    CounterItemComponent,
    CounterListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    CounterService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
