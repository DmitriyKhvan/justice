import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-response-law-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Проведение суда</div>
        <div class="col-6">
          {{ getValue('conductLawDic', actionData.data.decision) }}
        </div>
      </div>

      <ng-container *ngIf="actionData.data.decision === 1">
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
        *ngIf="actionData.data.decision === 2"
        class="row justify-content-between"
      >
        <div class="col-6">Действие</div>
        <div class="col-6">
          {{ getValue('actionDic', actionData.data.action) }}
        </div>
      </div>

      <ng-container *ngIf="actionData.data.action === 1">
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

      <div
        *ngIf="
          actionData.data.action === 1 ||
          actionData.data.action === 2 ||
          actionData.data.action === 3
        "
        class="row justify-content-between"
      >
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class SettingResponseLawTemplateComponent implements OnInit {
  @Input() actionData!: any;

  options = {
    conductLawDic: [
      { id: 1, label: 'Положительный' },
      { id: 2, label: 'Отрицательный' },
    ],

    actionDic: [
      { id: 1, label: 'Отложить' },
      { id: 2, label: 'Дело закрыто' },
      { id: 3, label: 'Новое обращение в суд' },
    ],
  };

  constructor() {}

  getValue(dicName: string, val: any): any {
    if (dicName === 'conductLawDic') {
      return this.options[dicName].find((i: any) => i.id === val)?.label;
    }

    if (dicName === 'actionDic') {
      return this.options[dicName].find((i: any) => i.id === val)?.label;
    }
  }

  ngOnInit(): void {}
}
