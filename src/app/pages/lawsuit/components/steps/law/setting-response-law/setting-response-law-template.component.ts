import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-setting-response-law-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Проведение суда</div>
        <div class="col-6">
          {{ getValue('conductingTrial', actionData.data.decision) }}
        </div>
      </div>

      <ng-container *ngIf="actionData.data.decision === 43">
        <div class="row justify-content-between">
          <div class="col-6">№ дела</div>
          <div class="col-6">{{ actionData.data.docNumber }}</div>
        </div>

        <div
          *ngFor="let date of actionData.data.lawDatetime"
          class="row justify-content-between"
        >
          <div class="col-6">Дата и время проведения суда</div>
          <div class="col-6">{{ date }}</div>
        </div>
      </ng-container>

      <div
        *ngIf="actionData.data.decision === 44"
        class="row justify-content-between"
      >
        <div class="col-6">Действие</div>
        <div class="col-6">
          {{ getValue('lawAnswerAction', actionData.data.action) }}
        </div>
      </div>

      <ng-container *ngIf="actionData.data.action === 45">
        <div class="row justify-content-between">
          <div class="col-6">Отложить до</div>
          <div class="col-6">{{ actionData.data.suspendDate }}</div>
        </div>
      </ng-container>

      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader [formData]="actionData"></app-file-downloader>
        </div>
      </div>

      <!-- *ngIf="
          actionData.data.action === 1 ||
          actionData.data.action === 2 ||
          actionData.data.action === 3
        " -->
      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class SettingResponseLawTemplateComponent implements OnInit {
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
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang
        .ru;
    }
  }
}
