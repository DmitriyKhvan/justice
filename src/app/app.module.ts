import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { DatepickerComponent } from './components/formFields/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsDetailComponent,
    DamageClaimsComponent,
    DatepickerComponent,
  ],
  imports: [
    TooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
