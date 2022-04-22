import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-mib-response-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'typeApplication' | translate }}</div>
        <div class="col-6">
          {{ getValue('formDocType', actionData.data.type) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'inDocNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'inDocDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'decisionResult' | translate }}</div>
        <div class="col-6">
          {{ getValue('mibDecision', actionData.data.decisionResult) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'appealAgainstLawDesicion' | translate }}</div>
        <div class="col-6">
          {{ getBooleanValue('yesNo', actionData.data.appeal) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'action2' | translate | titlecase }}</div>
        <div class="col-6">
          {{
            actionDic(actionData.data.action)?.lang[
              dicService.translate.currentLang
            ]
          }}
        </div>
      </div>

      <div
        *ngIf="
          actionDic(actionData.data.actionType)?.id === 158 ||
          actionDic(actionData.data.actionType)?.id === 159
        "
      >
        <div class="row justify-content-between">
          <div class="col-6">{{ 'principal_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">{{ 'percent_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
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
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
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
export class MibResponseTemplateComponent implements OnInit, OnDestroy {
  @Input() actionData!: any;

  dicSub!: Subscription;
  dictionaries!: any;

  constructor(public dicService: DictionariesService) {}

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

  getBooleanValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.value === val)
        ?.lang[this.dicService.translate.currentLang];
    }
  }

  actionDic(val: any) {
    if (this.dictionaries) {
      if (this.actionData.data.appeal === true) {
        return this.dictionaries.mibAppealYes?.find((i: any) => i.id === val);
      } else if (this.actionData.data.appeal === false) {
        return this.dictionaries.mibAppealNo?.find((i: any) => i.id === val);
      }
    }
  }

  ngOnDestroy(): void {}
}
