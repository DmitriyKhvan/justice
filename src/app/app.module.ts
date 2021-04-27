import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { ApplicationComponent } from './pages/application/application.component';
import { Step1Component } from './pages/application/shared/components/step1/step1.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatepickerComponent } from './components/formFields/datepicker/datepicker.component';
import { SendAlertStepComponent } from './pages/clients-detail/step-forms/send-alert-step/send-alert-step.component';
import { FileUploaderComponent } from './components/formFields/file-uploader/file-uploader.component';
import { SendApplicationStepComponent } from './pages/clients-detail/step-forms/send-application-step/send-application-step.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepComponent } from './components/step/step.component';
import { StepperWrapperComponent } from './components/stepper-wrapper/stepper-wrapper.component';
import { ChambersDecisionStepComponent } from './pages/clients-detail/step-forms/chambers-decision-step/chambers-decision-step.component';
import { Step2Component } from './pages/application/shared/components/step2/step2.component';
import { SendingCourtStepComponent } from './pages/clients-detail/step-forms/sending-court-step/sending-court-step.component';
import { ResponseCourtStepComponent } from './pages/clients-detail/step-forms/response-court-step/response-court-step.component';
import { FirstInstanceStepComponent } from './pages/clients-detail/step-forms/first-instance-step/first-instance-step.component';
import { AppealStepComponent } from './pages/clients-detail/step-forms/appeal-step/appeal-step.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsDetailComponent,
    DamageClaimsComponent,
    ApplicationComponent,
    Step1Component,
    DatepickerComponent,
    SendAlertStepComponent,
    FileUploaderComponent,
    SendApplicationStepComponent,
    StepComponent,
    StepperWrapperComponent,
    ChambersDecisionStepComponent,
    Step2Component,
    SendingCourtStepComponent,
    ResponseCourtStepComponent,
    FirstInstanceStepComponent,
    AppealStepComponent,
  ],
  imports: [
    TooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
