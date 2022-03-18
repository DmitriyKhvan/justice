import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-enforcement-response-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Орган</div>
        <div class="col-6">
          {{ getValue('lawEnforcement', actionData.data.organ) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Регион</div>
        <div class="col-6">
          {{ getValue('regionDistrict', actionData.data.region) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Район</div>
        <div class="col-6">
          {{
            getDistrict(
              'regionDistrict',
              actionData.data.region,
              actionData.data.district
            )
          }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Номер документа</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дата документа</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class EnforcementResponseTemplateComponent implements OnInit, OnDestroy {
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
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang
        .ru;
    }
  }

  getDistrict(dicName: string, regionId: number, districtId: number): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]
        ?.find((region: any) => region.id === regionId)
        ?.child.find((district: any) => district.id === districtId).lang.ru;
    }
  }

  ngOnDestroy(): void {
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
