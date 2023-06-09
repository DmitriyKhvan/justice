import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-balance-reception-template',
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
        <div class="col-6">Предложенная сумма</div>
        <div class="col-6">{{ actionData.data.proposedAmount }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Период уведомления до:</div>
        <div class="col-6">{{ actionData.data.notificationPeriod }}</div>
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
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class BalanceReceptionTemplateComponent implements OnInit {
  @Input() actionData!: any;

  constructor() {}

  ngOnInit(): void {}
}
