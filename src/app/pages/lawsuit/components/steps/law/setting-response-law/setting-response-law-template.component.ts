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

      <div class="row justify-content-between">
        <div class="col-6">Проведение суда</div>
        <div class="col-6">
          {{ getValue('actionDic', actionData.data.action) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Отложить до</div>
        <div class="col-6">{{ actionData.data.suspendDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <div class="fileList" *ngFor="let file of actionData.data.files">
            <i class="icon-attach mr-1"></i>
            <div class="file-field__list_text ml-1">
              {{ file.name }}
            </div>
          </div>
        </div>
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
