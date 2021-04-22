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
import { StepperComponent } from './components/stepper/stepper.component';
import { StepComponent } from './components/stepper/step/step.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { ApplicationComponent } from './pages/application/application.component';
import { Step1Component } from './pages/application/shared/components/step1/step1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsDetailComponent,
    StepperComponent,
    StepComponent,
    DamageClaimsComponent,
    ApplicationComponent,
    Step1Component,
  ],
  imports: [
    TooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
