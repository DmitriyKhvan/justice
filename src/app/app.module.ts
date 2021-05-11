import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { TooltipModule } from 'ng2-tooltip-directive';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';

import { DatepickerComponent } from './components/formFields/datepicker/datepicker.component';
import { FileUploaderComponent } from './components/formFields/file-uploader/file-uploader.component';
import { StepComponent } from './components/stepper/step/step.component';
import { StepperWrapperComponent } from './components/stepper/stepper-wrapper/stepper-wrapper.component';
import { AccordionWrapperComponent } from './components/accordion/accordion-wrapper/accordion-wrapper.component';
import { AccordionItemComponent } from './components/accordion/accordion-item/accordion-item.component';

import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';
import { SendAlertStepComponent } from './pages/clients-detail/step-forms/send-alert-step/send-alert-step.component';
import { SendApplicationStepComponent } from './pages/clients-detail/step-forms/send-application-step/send-application-step.component';
import { ChambersDecisionStepComponent } from './pages/clients-detail/step-forms/chambers-decision-step/chambers-decision-step.component';
import { SendingCourtStepComponent } from './pages/clients-detail/step-forms/sending-court-step/sending-court-step.component';
import { ResponseCourtStepComponent } from './pages/clients-detail/step-forms/response-court-step/response-court-step.component';
import { FirstInstanceStepComponent } from './pages/clients-detail/step-forms/first-instance-step/first-instance-step.component';
import { AppealStepComponent } from './pages/clients-detail/step-forms/appeal-step/appeal-step.component';
import { ProtestStepComponent } from './pages/clients-detail/step-forms/protest-step/protest-step.component';
import { SendingMibStepComponent } from './pages/clients-detail/step-forms/sending-mib-step/sending-mib-step.component';
import { ResponseMibStepComponent } from './pages/clients-detail/step-forms/response-mib-step/response-mib-step.component';
import { OutstandingAuctionStepComponent } from './pages/clients-detail/step-forms/outstanding-auction-step/outstanding-auction-step.component';
import { TerminateProcessStepComponent } from './pages/clients-detail/step-forms/terminate-process-step/terminate-process-step.component';
import { AcceptPropertyStepComponent } from './pages/clients-detail/step-forms/accept-property-step/accept-property-step.component';
import { FinalStepComponent } from './pages/clients-detail/step-forms/final-step/final-step.component';
import { HistoryComponent } from './pages/history/history.component';
import { SearchComponent } from './pages/search/search.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';


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
    SendAlertStepComponent,
    FileUploaderComponent,
    SendApplicationStepComponent,
    StepComponent,
    StepperWrapperComponent,
    ChambersDecisionStepComponent,
    SendingCourtStepComponent,
    ResponseCourtStepComponent,
    FirstInstanceStepComponent,
    AppealStepComponent,
    ProtestStepComponent,
    SendingMibStepComponent,
    ResponseMibStepComponent,
    OutstandingAuctionStepComponent,
    TerminateProcessStepComponent,
    AcceptPropertyStepComponent,
    FinalStepComponent,
    HistoryComponent,
    AccordionWrapperComponent,
    AccordionItemComponent,
    SearchComponent,
    SidebarComponent,
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
    AngularMyDatePickerModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
