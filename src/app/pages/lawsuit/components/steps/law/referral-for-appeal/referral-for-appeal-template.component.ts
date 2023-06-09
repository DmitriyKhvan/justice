import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-referral-for-appeal-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'jurisdiction_court' | translate }}</div>
        <div class="col-6">
          {{ getValue('courtKind', actionData.data.lawKind) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'jurisdiction_cases' | translate }}</div>
        <div class="col-6">
          {{ getValue('courtType', actionData.data.lawType) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'regionLaw' | translate }}</div>
        <div class="col-6">
          {{ getValue('regionLaw', actionData.data.regionLaw) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'region' | translate }}</div>
        <div class="col-6">
          {{ getRegionValue('regions', actionData.data.region) }}
        </div>
      </div>

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
export class ReferralForAppealTemplateComponent implements OnInit, OnDestroy {
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

  getRegionValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)
        ?.nameLocal[this.dicService.translate.currentLang];
    }
  }

  // getDistrict(dicName: string, regionId: number, districtId: number): any {
  //   if (this.dictionaries) {
  //     return this.dictionaries[dicName]
  //       ?.find((region: any) => region.id === regionId)
  //       ?.child.find((district: any) => district.id === districtId).lang[this.dicService.translate.currentLang];
  //   }
  // }

  ngOnDestroy(): void {
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
