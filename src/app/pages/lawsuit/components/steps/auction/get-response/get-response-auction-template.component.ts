import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-get-response-auction-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">№ Лота</div>
        <div class="col-6">{{ actionData.data.lotNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата конца торга</div>
        <div class="col-6">{{ actionData.data.endDateLot }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Выбор результата Лота</div>
        <div class="col-6">
          {{ getValue('result', actionData.data.result) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Сумма Лота</div>
        <div class="col-6">{{ actionData.data.lotSum }}</div>
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
export class GetResponseAuctionTemplateComponent implements OnInit {
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