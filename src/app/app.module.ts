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

// import { TooltipModule } from 'ng2-tooltip-directive';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';

import { DatepickerComponent } from './components/formFields/datepicker/datepicker.component';
import { SelectComponent } from './components/formFields/select/select.component';
import { FileUploaderComponent } from './components/formFields/file-uploader/file-uploader.component';
import { AccordionWrapperComponent } from './components/accordion/accordion-wrapper/accordion-wrapper.component';
import { AccordionItemComponent } from './components/accordion/accordion-item/accordion-item.component';

import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients-detail/clients-detail.component';
import { DamageClaimsComponent } from './pages/damage-claims/damage-claims.component';

import { HistoryComponent } from './pages/history/history.component';
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
import { StoppingBCETemplateComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/stopping-bce/stopping-bce-template.component';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { StopProcessComponent } from './pages/lawsuit/components/steps/stop-process/stop-process.component';
import { FirstAuctionComponent } from './pages/lawsuit/components/steps/auction/first-auction/first-auction.component';
import { RepeatAuctionComponent } from './pages/lawsuit/components/steps/auction/repeat-auction/repeat-auction.component';
import { BalanceReceptionComponent } from './pages/lawsuit/components/steps/auction/balance-reception/balance-reception.component';
import { FirstAuctionTemplateComponent } from './pages/lawsuit/components/steps/auction/first-auction/first-auction-template.component';
import { RepeatAuctionTemplateComponent } from './pages/lawsuit/components/steps/auction/repeat-auction/repeat-auction-template';
import { BalanceReceptionTemplateComponent } from './pages/lawsuit/components/steps/auction/balance-reception/balance-reception-template.component';
import { LawEnforcementComponent } from './pages/lawsuit/components/steps/law-enforcement/law-enforcement.component';
import { EnforcementRequestComponent } from './pages/lawsuit/components/steps/law-enforcement/enforcement-request/enforcement-request.component';
import { EnforcementResponseComponent } from './pages/lawsuit/components/steps/law-enforcement/enforcement-response/enforcement-response.component';
import { EnforcementResponseTemplateComponent } from './pages/lawsuit/components/steps/law-enforcement/enforcement-response/enforcement-response-template.component';
import { EnforcementRequestTemplateComponent } from './pages/lawsuit/components/steps/law-enforcement/enforcement-request/enforcement-request-template.component';
import { MainAppealComponent } from './pages/lawsuit/components/steps/law-enforcement/main-appeal/main-appeal.component';
import { MainAppealTemplateComponent } from './pages/lawsuit/components/steps/law-enforcement/main-appeal/main-appeal-template.component';
import { MainAppeaResponselTemplateComponent } from './pages/lawsuit/components/steps/law-enforcement/main-appeal-response/main-appeal-response-template.component';
import { MibResponseComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/mib-response/mib-response.component';
import { MibResponseTemplateComponent } from './pages/lawsuit/components/steps/bureau-compulsory-enforcement/mib-response/mib-response-template.component';
import { StopProcessTypeComponent } from './pages/lawsuit/components/steps/stop-process/stop-process-type/stop-process-type.component';
import { StopProcessTemplateComponent } from './pages/lawsuit/components/steps/stop-process/stop-process-type/stop-process-type-template.component';
import { StopProcessMessageComponent } from './pages/lawsuit/components/stop-process-message/stop-process-message.component';
import { StopProcessWrapComponent } from './pages/lawsuit/components/stop-process-wrap/stop-process-wrap.component';
import { StopProcessTabComponent } from './pages/lawsuit/components/stop-process-tab/stop-process-tab.component';
import { StopProcessListComponent } from './admin/pages/stop-process-list/stop-process-list.component';
import { PopUpStopProcessDecisionComponent } from './admin/components/pop-up-stop-process-decision/pop-up-stop-process-decision.component';
import { StopProcessMfoComponent } from './admin/pages/stop-process-mfo/stop-process-mfo.component';
import { GetResponseComponent } from './pages/lawsuit/components/steps/auction/get-response/get-response.component';
import { NumberTransformPipe } from './pipes/number-transform.pipe';
import { GetResponseAuctionTemplateComponent } from './pages/lawsuit/components/steps/auction/get-response/get-response-auction-template.component';
import { ListDecisionComponent } from './pages/lawsuit/components/list-decision/list-decision.component';
import { FormDecisionComponent } from './pages/lawsuit/components/list-decision/components/form-decision/form-decision.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { MakeDecesionsComponent } from './pages/lawsuit/components/make-decesions/make-decesions.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarListComponent } from './components/sidebar/components/sidebar-list.component';
import { SidebarDetailComponent } from './components/sidebar/components/sidebar-detail.component';
import { StatisticsTableComponent } from './pages/monitoring/components/statistics-table/statistics-table.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MainAppealResponseComponent } from './pages/lawsuit/components/steps/law-enforcement/main-appeal-response/main-appeal-response.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthIntercepter,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FileUploaderComponent,
    HistoryComponent,
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsDetailComponent,
    DamageClaimsComponent,
    DatepickerComponent,
    SelectComponent,
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
    StoppingBCETemplateComponent,
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
    StopProcessComponent,
    FirstAuctionComponent,
    RepeatAuctionComponent,
    BalanceReceptionComponent,
    FirstAuctionTemplateComponent,
    RepeatAuctionTemplateComponent,
    BalanceReceptionTemplateComponent,
    LawEnforcementComponent,
    EnforcementRequestComponent,
    EnforcementResponseComponent,
    EnforcementResponseTemplateComponent,
    EnforcementRequestTemplateComponent,
    MainAppealComponent,
    MainAppealTemplateComponent,
    MainAppeaResponselTemplateComponent,
    MibResponseComponent,
    MibResponseTemplateComponent,
    StopProcessTypeComponent,
    StopProcessTemplateComponent,
    StopProcessMessageComponent,
    StopProcessWrapComponent,
    StopProcessTabComponent,
    StopProcessListComponent,
    PopUpStopProcessDecisionComponent,
    StopProcessMfoComponent,
    GetResponseComponent,
    NumberTransformPipe,
    GetResponseAuctionTemplateComponent,
    ListDecisionComponent,
    FormDecisionComponent,
    UploadFilesComponent,
    MakeDecesionsComponent,
    SidebarListComponent,
    SidebarDetailComponent,
    StatisticsTableComponent,
    MainAppealResponseComponent,
  ],
  imports: [
    // TooltipModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'ru',
    }),
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  providers: [
    HttpClient,
    INTERCEPTOR_PROVIDER,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    CurrencyPipe,
    TitleCasePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
