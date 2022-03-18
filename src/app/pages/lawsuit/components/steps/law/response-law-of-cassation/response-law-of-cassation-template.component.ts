import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-response-law-of-cassation-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">№ дела</div>
        <div class="col-6">{{ actionData.data.docNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата решения</div>
        <div class="col-6">{{ actionData.data.decisionDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">Результат решения</div>
        <div class="col-6">
          {{ getValue('courtDecision', actionData.data.decisionResult) }}
        </div>
      </div>

      <ng-container
        *ngIf="
          actionData.data.decisionResult === 35 ||
          actionData.data.decisionResult === 36
        "
      >
        <div class="row justify-content-between">
          <div class="col-6">Обжаловать решение суда</div>
          <div class="col-6">
            {{ getValueYesOrNot('yesNo', actionData.data.appeal) }}
          </div>
        </div>

        <ng-container *ngIf="actionData.data.appeal === true">
          <div class="row justify-content-between">
            <div class="col-6">Вид обжалование</div>
            <div class="col-6">
              {{ getValue('appealType', actionData.data.appealKind) }}
            </div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Сумма основного долга</div>
            <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Сумма процента</div>
            <div class="col-6">{{ actionData.data.appealInterestAmount }}</div>
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

          <!-- <div class="row justify-content-between">
          <div class="col-6">Прикрепленные файлы</div>
          <div class="col-6">
            <app-file-downloader
              [formData]="actionData"
            ></app-file-downloader>
          </div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">Дополнительная информация</div>
          <div class="col-6">{{ actionData.data.appealAddInfo }}</div>
        </div> -->
        </ng-container>

        <ng-container *ngIf="actionData.data.appeal === false">
          <div class="row justify-content-between">
            <div class="col-6">Действия</div>
            <div class="col-6">
              {{ getValue('notAppealAction', actionData.data.action) }}
            </div>
          </div>

          <ng-container *ngIf="actionData.data.action === 49">
            <div class="row justify-content-between">
              <div class="col-6">Отложить до</div>
              <div class="col-6">{{ actionData.data.suspendDate }}</div>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-container
        *ngIf="actionData.data.decisionResult === 34"
        class="row justify-content-between"
      >
        <div class="row justify-content-between">
          <div class="col-6">Дата вступления решения в силу</div>
          <div class="col-6">{{ actionData.data.decisionBeginDate }}</div>
        </div>
      </ng-container>

      <!-- <ng-container *ngIf="actionData.data.action == 3"> -->
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
      <!-- </ng-container> -->
    </div>
  `,
  styles: [],
})
export class ResponseLawOfCassationTemplateComponent implements OnInit {
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

  getValueYesOrNot(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.value === val)?.lang
        .ru;
    }
  }
}
