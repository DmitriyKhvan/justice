import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-sending-case-law-template',
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
        <div class="col-6">{{ 'region' | translate }}</div>
        <div class="col-6">
          {{ getValue('regionDistrict', actionData.data.region) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'district' | translate }}</div>
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

      <div
        *ngFor="
          let defendant of actionData.data?.defendantArray;
          let idx = index
        "
        class="row justify-content-between"
      >
        <div class="col-6">{{ 'defendant' | translate }} {{ idx + 1 }}</div>
        <div class="col-6">{{ defendant }}</div>
      </div>

      <div
        *ngFor="
          let thirdParties of actionData.data?.thirdPartiesArray;
          let idx = index
        "
        class="row justify-content-between"
      >
        <div class="col-6">{{ '3rd_person' | translate }} {{ idx + 1 }}</div>
        <div class="col-6">{{ thirdParties }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'principal_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.principalAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'percent_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.percentAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'penalty_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.penaltyAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'fine_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.fineAmount }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'total_claim_amount' | translate }}</div>
        <div class="col-6">{{ actionData.data.totalClaimAmount }}</div>
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
export class SendingCaseLawTemplateComponent implements OnInit, OnDestroy {
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

  getDistrict(dicName: string, regionId: number, districtId: number): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]
        ?.find((region: any) => region.id === regionId)
        ?.child.find((district: any) => district.id === districtId).lang[
        this.dicService.translate.currentLang
      ];
    }
  }

  ngOnDestroy(): void {
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
