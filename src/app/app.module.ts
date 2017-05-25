import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { CounterAppComponent } from './components/counter-app/counter-app.component';
import { CounterFormComponent } from './components/counter-app/counter-form/counter-form.component';
import { CounterItemComponent } from './components/counter-app/counter-list/counter-item/counter-item.component';
import { CounterListComponent } from './components/counter-app/counter-list/counter-list.component';

import { AuthGuard } from './guards/auth.guard';

import { CounterService } from './counter.service';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CounterAppComponent,
    CounterFormComponent,
    CounterItemComponent,
    CounterListComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
  ],
  providers: [
    CounterService,
    ValidateService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
