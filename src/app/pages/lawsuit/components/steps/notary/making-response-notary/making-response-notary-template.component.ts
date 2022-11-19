import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-making-response-notary-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'inDocNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'inDocDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'principal_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'percent_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.appealInterestAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'penalty_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.appealPenaltyAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'fine_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.appealFineAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">
          {{ 'appealStateDutyCourtCostsAmount' | translate }}
        </div>
        <div class="col-6">
          {{ actionData.data.appealStateDutyCourtCostsAmount }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'total_claim_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.appealClaimAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'attached_files' | translate }}</div>
        <div class="col-6">
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MakingResponseNotaryTemplateComponent implements OnInit {
  @Input() actionData!: any;
  constructor() {}

  ngOnInit(): void {}
}
