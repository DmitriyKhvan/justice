import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';

import { TooltipModule } from 'ng2-tooltip-directive';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';

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
import { ApplicationComponent } from './pages/application/application.component';
import { Step1Component } from './pages/application/shared/components/step1/step1.component';
import { SendAlertStepComponent } from './pages/clients-detail/step-forms/send-alert-step/send-alert-step.component';
import { SendApplicationStepComponent } from './pages/clients-detail/step-forms/send-application-step/send-application-step.component';

import { ChambersDecisionStepComponent } from './pages/clients-detail/step-forms/chambers-decision-step/chambers-decision-step.component';
import { Step2Component } from './pages/application/shared/components/step2/step2.component';
import { SendingCourtStepComponent } from './pages/clients-detail/step-forms/sending-court-step/sending-court-step.component';
import { ResponseCourtStepComponent } from './pages/clients-detail/step-forms/response-court-step/response-court-step.component';
import { FirstInstanceStepComponent } from './pages/clients-detail/step-forms/first-instance-step/first-instance-step.component';
import { AppealStepComponent } from './pages/clients-detail/step-forms/appeal-step/appeal-step.component';
import { Step3Component } from './pages/application/shared/components/step3/step3.component';
import { Step4Component } from './pages/application/shared/components/step4/step4.component';
import { Step5Component } from './pages/application/shared/components/step5/step5.component';
import { Step5_1Component } from './pages/application/shared/components/step5.1/step5.1.component';
import { Step5_2Component } from './pages/application/shared/components/step5.2/step5.2.component';
import { Step6Component } from './pages/application/shared/components/step6/step6.component';
import { Step7Component } from './pages/application/shared/components/step7/step7.component';
import { Step8Component } from './pages/application/shared/components/step8/step8.component';
import { Step9Component } from './pages/application/shared/components/step9/step9.component';
import { Step10Component } from './pages/application/shared/components/step10/step10.component';
import { ProtestStepComponent } from './pages/clients-detail/step-forms/protest-step/protest-step.component';
import { SendingMibStepComponent } from './pages/clients-detail/step-forms/sending-mib-step/sending-mib-step.component';
import { ResponseMibStepComponent } from './pages/clients-detail/step-forms/response-mib-step/response-mib-step.component';
import { OutstandingAuctionStepComponent } from './pages/clients-detail/step-forms/outstanding-auction-step/outstanding-auction-step.component';
import { TerminateProcessStepComponent } from './pages/clients-detail/step-forms/terminate-process-step/terminate-process-step.component';
import { AcceptPropertyStepComponent } from './pages/clients-detail/step-forms/accept-property-step/accept-property-step.component';
import { FinalStepComponent } from './pages/clients-detail/step-forms/final-step/final-step.component';
import { HistoryComponent } from './pages/history/history.component';
import { LawyerFormStep6Component } from './pages/application/shared/components/step6/components/lawyer-form/lawyer-form.component';
import { HeadLawyerFormStep6Component } from './pages/application/shared/components/step6/components/head-lawyer-form/head-lawyer-form.component';
import { HeadLawyerFormStep7SuccessComponent } from './pages/application/shared/components/step7/components/head-lawyer-form-step7-success/head-lawyer-form-step7-success.component';
import { HeadLawyerFormStep7FailureComponent } from './pages/application/shared/components/step7/components/head-lawyer-form-step7-failure/head-lawyer-form-step7-failure.component';
import { LawyerFormStep7FailureComponent } from './pages/application/shared/components/step7/components/lawyer-form-step7-failure/lawyer-form-step7-failure.component';
import { LawyerFormStep7SuccessComponent } from './pages/application/shared/components/step7/components/lawyer-form-step7-success/lawyer-form-step7-success.component';
import { LawyerFormStep8SuccesComponent } from './pages/application/shared/components/step8/components/lawyer-form-step8-succes/lawyer-form-step8-success.component';
import { LawyerFormStep8FailureComponent } from './pages/application/shared/components/step8/components/lawyer-form-step8-failure/lawyer-form-step8-failure.component';
import { LawerFormStep10Component } from './pages/application/shared/components/step10/lawer-form-step10/lawer-form-step10.component';
import { HeadLawerFormStep10Component } from './pages/application/shared/components/step10/head-lawer-form-step10/head-lawer-form-step10.component';
import { FinishFormStep10Component } from './pages/application/shared/components/step10/finish-form-step10/finish-form-step10.component';
import { AlertComponent } from './components/alert/alert.component';
import { ApplicationListComponent } from './pages/damage-claims/shared/components/application-list/application-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { AdminComponent as AdminLayoutComponent } from './layouts/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthIntercepter } from './auth.intercepter';
import { AlertInfoComponent } from './components/alert-info/alert-info.component';
import { CustomToggleComponent } from './components/checkboxes/custom-toggle/custom-toggle.component';
import { IsActiveUserComponent } from './components/is-active-user/is-active-user.component';
import { ErrorComponent } from './pages/error/error.component';
import { SharedModule } from './shared.module';
import { AddUserComponent } from './admin/pages/add-user/add-user.component';
import { EditUserComponent } from './admin/pages/edit-user/edit-user.component';
import { ListUserComponent } from './admin/pages/list-user/list-user.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoginPassComponent } from './components/login-pass/login-pass.component';
import { NgxPaginationModule } from 'ngx-pagination';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthIntercepter,
};

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
    Step3Component,
    Step4Component,
    Step5Component,
    Step5_1Component,
    Step5_2Component,
    Step6Component,
    Step7Component,
    Step8Component,
    Step9Component,
    Step10Component,
    ProtestStepComponent,
    SendingMibStepComponent,
    ResponseMibStepComponent,
    OutstandingAuctionStepComponent,
    TerminateProcessStepComponent,
    AcceptPropertyStepComponent,
    FinalStepComponent,
    HistoryComponent,
    LawyerFormStep6Component,
    HeadLawyerFormStep6Component,
    HeadLawyerFormStep7SuccessComponent,
    HeadLawyerFormStep7FailureComponent,
    LawyerFormStep7FailureComponent,
    LawyerFormStep7SuccessComponent,
    LawyerFormStep8SuccesComponent,
    LawyerFormStep8FailureComponent,
    LawerFormStep10Component,
    HeadLawerFormStep10Component,
    FinishFormStep10Component,
    AccordionWrapperComponent,
    AccordionItemComponent,
    AlertComponent,
    ApplicationListComponent,
    LoginComponent,
    MainComponent,
    AdminLayoutComponent,
    SidebarComponent,
    SearchComponent,
    AlertInfoComponent,
    CustomToggleComponent,
    IsActiveUserComponent,
    ErrorComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    ConfirmComponent,
    LoginPassComponent,
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
    NgxPaginationModule,
  ],
  providers: [HttpClient, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
