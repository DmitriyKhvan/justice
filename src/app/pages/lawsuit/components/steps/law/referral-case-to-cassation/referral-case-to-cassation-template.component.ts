import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-referral-case-to-cassation-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Вид суда</div>
        <div class="col-6">
          {{ getValue('viewLawDic', actionData.data.lawKind) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Тип суда</div>
        <div class="col-6">
          {{ getValue('typeLawDic', actionData.data.lawType) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Регион суда</div>
        <div class="col-6">
          {{ getValue('regionLawDic', actionData.data.lawRegion) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Регион</div>
        <div class="col-6">
          {{ getValue('regionDic', actionData.data.region) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Районный суд</div>
        <div class="col-6">
          {{ getValue('districtLawDic', actionData.data.lawDistrict) }}
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
export class ReferralCaseToCassationTemplateComponent implements OnInit {
  @Input() actionData!: any;

  options = {
    viewLawDic: [
      { value: 1, label: 'Вид1' },
      { value: 2, label: 'Вид2' },
    ],

    typeLawDic: [
      { value: 1, label: 'Тип1' },
      { value: 2, label: 'Тип2' },
    ],

    regionLawDic: [
      { value: 1, label: 'Регион суда1' },
      { value: 2, label: 'Регион суда2' },
    ],

    regionDic: [
      { value: 1, label: 'Регион1' },
      { value: 2, label: 'Регион2' },
    ],

    districtLawDic: [
      { value: 1, label: 'Районный суд1' },
      { value: 2, label: 'Районный суд2' },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  getValue(dicName: string, val: any): any {
    if (dicName === 'viewLawDic') {
      return this.options[dicName].find((i: any) => i.value === val)?.label;
    }

    if (dicName === 'typeLawDic') {
      return this.options[dicName].find((i: any) => i.value === val)?.label;
    }

    if (dicName === 'regionLawDic') {
      return this.options[dicName].find((i: any) => i.value === val)?.label;
    }

    if (dicName === 'regionDic') {
      return this.options[dicName].find((i: any) => i.value === val)?.label;
    }

    if (dicName === 'districtLawDic') {
      return this.options[dicName].find((i: any) => i.value === val)?.label;
    }
  }
}
