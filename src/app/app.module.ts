import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  Provider,
} from '@angular/core';

import { TooltipModule } from 'ng2-tooltip-directive';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';

import { DatepickerComponent } from './components/formFields/datepicker/datepicker.component';
import { SelectComponent } from './components/formFields/select/select.component';
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
import { LoaderComponent } from './components/loader/loader.component';
import { LawsuitComponent } from './pages/lawsuit/lawsuit.component';
import { NotificationComponent } from './pages/lawsuit/components/steps/notification/notification.component';
import { NotificationFormComponent } from './pages/lawsuit/components/steps/notification/notification-form/notification-form.component';
import { NextStepComponent } from './pages/lawsuit/components/next-step/next-step.component';
import { HistoryActionsComponent } from './pages/lawsuit/components/history-actions/history-actions.component';
import { HistoryStepComponent } from './pages/lawsuit/components/history-step/history-step.component';
import { SelectActionComponent } from './pages/lawsuit/components/select-action/select-action.component';
import { TabsComponent } from './pages/lawsuit/components/tabs/tabs.component';
import { ChamberCommerceIndustryComponent } from './pages/lawsuit/components/steps/chamber-commerce-industry/chamber-commerce-industry.component';
import { SendingApplicationComponent } from './pages/lawsuit/components/steps/chamber-commerce-industry/sending-application/sending-application.component';
import { MakingResponseComponent } from './pages/lawsuit/components/steps/chamber-commerce-industry/making-response/making-response.component';
import { LawComponent } from './pages/lawsuit/components/steps/law/law.component';
import { SendingCaseLawComponent } from './pages/lawsuit/components/steps/law/sending-case-law/sending-case-law.component';
import { SettingResponseLawComponent } from './pages/lawsuit/components/steps/law/setting-response-law/setting-response-law.component';
import { NotaryComponent } from './pages/lawsuit/components/steps/notary/notary.component';
import { MakingResponseNotaryComponent } from './pages/lawsuit/components/steps/notary/making-response-notary/making-response-notary.component';
import { SendingApplicationNotaryComponent } from './pages/lawsuit/components/steps/notary/sending-application-notary/sending-application-notary.component';
import { BureauCompulsoryEnforcementComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/bureau-compulsory-enforcement.component';
import { CaseTransferComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/case-transfer/case-transfer.component';
import { AuctionComponent } from './pages/lawsuit/components/steps/auction/auction.component';
import { StopingAuctionComponent } from './pages/lawsuit/components/steps/auction/stoping-auction/stoping-auction.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { FirstInstanceDecisionComponent } from './pages/lawsuit/components/steps/law/first-instance-decision/first-instance-decision.component';
import { ReferralForAppealComponent } from './pages/lawsuit/components/steps/law/referral-for-appeal/referral-for-appeal.component';
import { AppealLawResponseComponent } from './pages/lawsuit/components/steps/law/appeal-law-response/appeal-law-response.component';
import { ReferralCaseToCassationComponent } from './pages/lawsuit/components/steps/law/referral-case-to-cassation/referral-case-to-cassation.component';
import { ResponseLawOfCassationComponent } from './pages/lawsuit/components/steps/law/response-law-of-cassation/response-law-of-cassation.component';
import { ContractInfoComponent } from './pages/lawsuit/components/contract-info/contract-info.component';
import { StoppingBCEComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/stopping-bce/stopping-bce.component';
import { PopUpWatchFormComponent } from './pages/lawsuit/components/pop-up-watch-form/pop-up-watch-form.component';
import { PopUpStepInfoComponent } from './pages/lawsuit/components/pop-up-step-info/pop-up-step-info.component';
import { PopUpListDecisionComponent } from './pages/lawsuit/components/pop-up-list-decision/pop-up-list-decision.component';
import { NotificationFormTemplateComponent } from './pages/lawsuit/components/steps/notification/notification-form/notification-form-template.component';
import { CaseTransferTemplateComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/case-transfer/case-transfer-template.component';
import { SendingCaseLawTemplateComponent } from './pages/lawsuit/components/steps/law/sending-case-law/sending-case-law-template.component';
import { SettingResponseLawTemplateComponent } from './pages/lawsuit/components/steps/law/setting-response-law/setting-response-law-template.component';
import { FirstInstanceDecisionTemplateComponent } from './pages/lawsuit/components/steps/law/first-instance-decision/first-instance-decision-template.component';
import { AppealLawResponseTemplateComponent } from './pages/lawsuit/components/steps/law/appeal-law-response/appeal-law-response-template.component';
import { ResponseLawOfCassationTemplateComponent } from './pages/lawsuit/components/steps/law/response-law-of-cassation/response-law-of-cassation-template.component';
import { ReferralForAppealTemplateComponent } from './pages/lawsuit/components/steps/law/referral-for-appeal/referral-for-appeal-template.component';
import { ReferralCaseToCassationTemplateComponent } from './pages/lawsuit/components/steps/law/referral-case-to-cassation/referral-case-to-cassation-template.component';
import { MakingResponseNotaryTemplateComponent } from './pages/lawsuit/components/steps/notary/making-response-notary/making-response-notary-template.component';
import { SendingApplicationNotaryTemplateComponent } from './pages/lawsuit/components/steps/notary/sending-application-notary/sending-application-notary-template.component';
import { SendingApplicationTemplateComponent } from './pages/lawsuit/components/steps/chamber-commerce-industry/sending-application/sending-application-template.component';
import { MakingResponseTemplateComponent } from './pages/lawsuit/components/steps/chamber-commerce-industry/making-response/making-response-template.component';
import { DeclensionOfWordsPipe } from './pipes/declension-of-words.pipe';
import { PopUpTemplateFormComponent } from './pages/lawsuit/components/pop-up-template-form/pop-up-template-form.component';
import { NotificationStep } from './components/sidebar/components/notification-step';
import { NotificationAction } from './components/sidebar/components/notification-action';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import { MapComponent } from './pages/monitoring/components/map/map.component';
import { TooltipMapComponent } from './pages/monitoring/components/tooltipMap';
import { TableComponent } from './pages/monitoring/components/table/table.component';
import { FileDownloaderComponent } from './components/formFields/file-downloader/file-downloader.component';
import { PopUpTemplateTextComponent } from './pages/lawsuit/components/pop-up-template-text/pop-up-template-text.component';

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
    SelectComponent,
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
    LoaderComponent,
    LawsuitComponent,
    NotificationComponent,
    NotificationFormComponent,
    NextStepComponent,
    HistoryActionsComponent,
    HistoryStepComponent,
    SelectActionComponent,
    TabsComponent,
    ChamberCommerceIndustryComponent,
    SendingApplicationComponent,
    MakingResponseComponent,
    LawComponent,
    SendingCaseLawComponent,
    SettingResponseLawComponent,
    NotaryComponent,
    MakingResponseNotaryComponent,
    SendingApplicationNotaryComponent,
    BureauCompulsoryEnforcementComponent,
    CaseTransferComponent,
    AuctionComponent,
    StopingAuctionComponent,
    FirstInstanceDecisionComponent,
    ReferralForAppealComponent,
    AppealLawResponseComponent,
    ReferralCaseToCassationComponent,
    ResponseLawOfCassationComponent,
    ContractInfoComponent,
    StoppingBCEComponent,
    PopUpWatchFormComponent,
    PopUpStepInfoComponent,
    PopUpListDecisionComponent,
    NotificationFormTemplateComponent,
    CaseTransferTemplateComponent,
    SendingCaseLawTemplateComponent,
    SettingResponseLawTemplateComponent,
    FirstInstanceDecisionTemplateComponent,
    AppealLawResponseTemplateComponent,
    ResponseLawOfCassationTemplateComponent,
    ReferralForAppealTemplateComponent,
    ReferralCaseToCassationTemplateComponent,
    MakingResponseNotaryTemplateComponent,
    SendingApplicationNotaryTemplateComponent,
    SendingApplicationTemplateComponent,
    MakingResponseTemplateComponent,
    DeclensionOfWordsPipe,
    PopUpTemplateFormComponent,
    NotificationStep,
    NotificationAction,
    MonitoringComponent,
    MapComponent,
    TooltipMapComponent,
    TableComponent,
    FileDownloaderComponent,
    PopUpTemplateTextComponent,
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
    KeycloakAngularModule,
  ],
  providers: [
    HttpClient,
    // INTERCEPTOR_PROVIDER,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
