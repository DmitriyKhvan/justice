import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-stopping-bce-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'stopType' | translate }}</div>
        <div class="col-6">
          {{ getValue('stopType', actionData.data.stopType) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'renewalDateCheck' | translate }}</div>
        <div class="col-6">{{ actionData.data.stopSuspendDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'stopInitiator' | translate }}</div>
        <div class="col-6">
          {{ getValue('initiatorType', actionData.data.stopInitiator) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'docDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.stopDocDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.stopAddInfo }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'attached_files' | translate }}</div>
        <div class="col-6">
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'stopReason' | translate }}</div>
        <div class="col-6">
          {{ reasonStoppingDic(actionData.data.stopReason) }}
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class StoppingBCETemplateComponent implements OnInit {
  @Input() actionData!: any;

  dicSub!: Subscription;
  dictionaries!: any;

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

  reasonStoppingDic(val: any) {
    if (this.dictionaries) {
      if (this.actionData.data.stopInitiator === 5) {
        return this.dictionaries.stopReasonClient?.find(
          (i: any) => i.id === val
        )?.lang[this.dicService.translate.currentLang];
      } else if (this.actionData.data.stopInitiator === 6) {
        return this.dictionaries.stopReasonBank?.find((i: any) => i.id === val)
          ?.lang[this.dicService.translate.currentLang];
      } else if (this.actionData.data.stopInitiator === 7) {
        return this.dictionaries.stopReasonMib?.find((i: any) => i.id === val)
          ?.lang[this.dicService.translate.currentLang];
      } else {
        return this.dictionaries.stopReasonCourt?.find((i: any) => i.id === val)
          ?.lang[this.dicService.translate.currentLang];
      }
    }
  }
}
