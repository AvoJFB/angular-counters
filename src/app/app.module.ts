import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterAppComponent } from './components/counter-app/counter-app.component';
import { CounterFormComponent } from './components/counter-app/counter-form/counter-form.component';
import { CounterItemComponent } from './components/counter-app/counter-list/counter-item/counter-item.component';
import { CounterListComponent } from './components/counter-app/counter-list/counter-list.component';

import { CounterService } from './counter.service';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterAppComponent,
    CounterFormComponent,
    CounterItemComponent,
    CounterListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    CounterService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
