import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appeal-law-response-template',
  template: `
    <!-- <pre>
    {{ actionData | json }}
  </pre
    > -->
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
        <div class="col-6">{{ actionData.data.decisionResult }}</div>
      </div>

      <ng-container *ngIf="actionData.data.decisionResult === 1">
        <div class="row justify-content-between">
          <div class="col-6">Обжаловать решение суда</div>
          <div class="col-6">{{ actionData.data.appeal }}</div>
        </div>

        <ng-container *ngIf="actionData.data.appeal == 1">
          <div class="row justify-content-between">
            <div class="col-6">Вид обжалование</div>
            <div class="col-6">{{ actionData.data.appealKind }}</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Общая сумма</div>
            <div class="col-6">{{ actionData.data.appealTotalAmount }}</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Сумма основного долга</div>
            <div class="col-6">{{ actionData.data.appealMainDebt }}</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Сумма неустойки</div>
            <div class="col-6">{{ actionData.data.appealPenaltySum }}</div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Сумма госпошлины и судебных издержек</div>
            <div class="col-6">{{ actionData.data.appealOtherAmount }}</div>
          </div>

          <!-- <div class="row justify-content-between">
            <div class="col-6">Прикрепленные файлы</div>
            <div class="col-6">
              <div
                class="fileList"
                *ngFor="let file of actionData.data.appealFiles"
              >
                <i class="icon-attach mr-1"></i>
                <div class="file-field__list_text ml-1">
                  {{ file.name }}
                </div>
              </div>
            </div>
          </div> -->

          <div class="row justify-content-between">
            <div class="col-6">Прикрепленные файлы</div>
            <div class="col-6">
              <app-file-uploader [formData]="actionData"></app-file-uploader>
            </div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">Дополнительная информация</div>
            <div class="col-6">{{ actionData.data.appealAddInfo }}</div>
          </div>
        </ng-container>

        <ng-container *ngIf="actionData.data.appeal == 2">
          <div class="row justify-content-between">
            <div class="col-6">Действия</div>
            <div class="col-6">{{ actionData.data.action }}</div>
          </div>

          <ng-container *ngIf="actionData.data.action == 2">
            <div class="row justify-content-between">
              <div class="col-6">Отложить до</div>
              <div class="col-6">{{ actionData.data.suspendDate }}</div>
            </div>
          </ng-container>

          <ng-container *ngIf="actionData.data.action == 3">
            <div class="row justify-content-between">
              <div class="col-6">Прикрепленные файлы</div>
              <div class="col-6">
                <div
                  class="fileList"
                  *ngFor="let file of actionData.data.files"
                >
                  <i class="icon-attach mr-1"></i>
                  <div class="file-field__list_text ml-1">
                    {{ file.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-between">
              <div class="col-6">Дополнительная информация</div>
              <div class="col-6">{{ actionData.data.addInfo }}</div>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-container
        *ngIf="actionData.data.decisionResult === 2"
        class="row justify-content-between"
      >
        <div class="row justify-content-between">
          <div class="col-6">Дата вступления решения в силу</div>
          <div class="col-6">{{ actionData.data.decisionBeginDate }}</div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class AppealLawResponseTemplateComponent implements OnInit {
  @Input() actionData!: any;
  constructor() {}

  ngOnInit(): void {}
}
