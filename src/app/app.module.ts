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
import { StepperComponent } from './pages/clients-detail/components/stepper/stepper.component';
import { StepComponent } from './pages/clients-detail/components/stepper/step/step.component';
import { UploadBtnComponent } from './components/forms/upload-btn/upload-btn.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './components/forms/form/form.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';

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
    UploadBtnComponent,
    FormComponent,
    DamageClaimsComponent,
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
