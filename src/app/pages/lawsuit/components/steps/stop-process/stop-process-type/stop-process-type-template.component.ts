import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-stop-process-template',
  template: `
    <div class="container data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Тип остановки</div>
        <div class="col-6">
          {{ getValue('stopType', actionData.data?.type) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата возобновления процесса</div>
        <div class="col-6">{{ actionData.data?.renewalDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">№ документа</div>
        <div class="col-6">{{ actionData.data?.docNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дата документа</div>
        <div class="col-6">{{ actionData.data?.docDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data?.addInfo }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader [formData]="actionData"></app-file-downloader>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Инициатор остановки</div>
        <div class="col-6">
          {{ getValue('stopInitiator', actionData.data?.stopInitiator) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Причина остановки</div>
        <div class="col-6">
          {{
            reasonStoppingDic(
              actionData.data?.stopInitiator,
              actionData.data?.stopReason
            )
          }}
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class StopProcessTemplateComponent implements OnInit {
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

  reasonStoppingDic(idIndicator: any, idReason: any) {
    if (this.dictionaries) {
      return this.dictionaries?.stopInitiator
        .find((e: any) => e.id === idIndicator)
        ?.child?.data.find((i: any) => i.id === idReason).lang.ru;
    }
  }
}
