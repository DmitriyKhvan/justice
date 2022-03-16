import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-repeat-auction-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">№ Лота</div>
        <div class="col-6">{{ actionData.data.lotNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата начала первого торга</div>
        <div class="col-6">{{ actionData.data.beginDateLot }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата конец первого торга</div>
        <div class="col-6">{{ actionData.data.endDateLot }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Выбор результата Лота</div>
        <div class="col-6">
          {{ getValue('result', actionData.data.result) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader [formData]="actionData"></app-file-downloader>
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
export class RepeatAuctionTemplateComponent implements OnInit {
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
