import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-mib-response-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Тип подачи заявки</div>
        <div class="col-6">
          {{ getValue('formDocType', actionData.data.type) }}
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">№ вхд. документа</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дата вхд. документа</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Результат решения</div>
        <div class="col-6">
          {{ getValue('mibDecision', actionData.data.decisionResult) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Обжаловать решение суда</div>
        <div class="col-6">
          {{ getBooleanValue('yesNo', actionData.data.appeal) }}
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Действия</div>
        <div class="col-6">
          {{ actionDic(actionData.data.action)?.lang.ru }}
        </div>
      </div>

      <div
        *ngIf="
          actionDic(actionData.data.actionType)?.id === 158 ||
          actionDic(actionData.data.actionType)?.id === 159
        "
      >
        <div class="row justify-content-between">
          <div class="col-6">Сумма основного долга</div>
          <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Сумма процента</div>
          <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Сумма пени</div>
          <div class="col-6">{{ actionData.data.appealPenaltyAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Сумма штрафа</div>
          <div class="col-6">{{ actionData.data.appealFineAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Сумма госпошлины и судебных издержек</div>
          <div class="col-6">
            {{ actionData.data.appealStateDutyCourtCostsAmount }}
          </div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Общая сумма иска</div>
          <div class="col-6">{{ actionData.data.appealClaimAmount }}</div>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader [formData]="actionData"></app-file-downloader>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MibResponseTemplateComponent implements OnInit, OnDestroy {
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

  getBooleanValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.value === val)?.lang
        .ru;
    }
  }

  actionDic(val: any) {
    if (this.dictionaries) {
      if (this.actionData.data.appeal === true) {
        return this.dictionaries.mibAppealYes?.find((i: any) => i.id === val);
      } else if (this.actionData.data.appeal === false) {
        return this.dictionaries.mibAppealNo?.find((i: any) => i.id === val);
      }
    }
  }

  ngOnDestroy(): void {}
}
