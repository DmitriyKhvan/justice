import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-main-appeal-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'object' | translate }}</div>
        <div class="col-6">
          {{ getValue('mainAppealObject', actionData.data.object) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'subject' | translate }}</div>
        <div class="col-6">
          {{ getValue('mainAppealSubject', actionData.data.subject) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'docNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.docNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'docDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.docDate }}</div>
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
export class MainAppealTemplateComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    if (this.dicSub) {
      this.dicSub.unsubscribe();
    }
  }
}
