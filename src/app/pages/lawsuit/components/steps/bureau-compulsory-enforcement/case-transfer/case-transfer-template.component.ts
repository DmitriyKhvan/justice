import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-transfer-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Вид суда</div>
        <div class="col-6">
          {{ getValue(actionData.data.type) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">№ исх. документа</div>
        <div class="col-6">{{ actionData.data.outDocNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата исх. документа</div>
        <div class="col-6">{{ actionData.data.outDocDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-uploader [formData]="actionData"></app-file-uploader>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CaseTransferTemplateComponent implements OnInit {
  @Input() actionData!: any;

  options = [
    { id: 1, label: 'В электронном виде' },
    { id: 2, label: 'В бумажном виде' },
  ];

  constructor() {}

  ngOnInit(): void {}

  getValue(val: number): any {
    return this.options.find((i) => i.id === val)?.label;
  }
}
