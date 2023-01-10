import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-re-cassation-request-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'outDocNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.outDocNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'outDocDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.outDocDate }}</div>
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
export class ReCassationRequestTemplate implements OnInit {
  @Input() actionData!: any;

  dicSub!: Subscription;
  dictionaries: any = null;

  constructor(private dicService: DictionariesService) {}

  ngOnInit(): void {
    this.dicSub = this.dicService
      .getDicByActionId(this.actionData.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });
  }

  getValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang[
        this.dicService.translate.currentLang
      ];
    }
  }

  ngOnDestroy(): void {
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
