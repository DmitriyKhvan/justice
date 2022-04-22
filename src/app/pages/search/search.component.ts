import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="h-100">
      <div class="container">
        <h2 class="row no-gutters justify-content-center mt-5 pt-5">
          Поиск по любым параметрам
        </h2>
        <div class="row justify-content-center">
          <div class="col-8">
            <form class="page-form w-100">
              <div class="row justify-content-between mb-2">
                <div class="col-6">
                  <div class="input-field">
                    <div class="input-field__title">Имя клиента</div>
                    <label class="input-field__label">
                      <input type="text" autocomplete="off" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="row justify-content-between mb-2">
                <div class="col-6">
                  <div class="input-field">
                    <div class="input-field__title">ИНН клиента</div>
                    <label class="input-field__label">
                      <input type="text" autocomplete="off" />
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-field">
                    <div class="input-field__title">ID договора</div>
                    <label class="input-field__label">
                      <input type="text" autocomplete="off" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="row justify-content-between mb-2">
                <div class="col-6">
                  <div class="input-field">
                    <div class="input-field__title">Сумма кредита</div>
                    <div
                      class="d-flex flex-nowrap align-items-center no-gutters w-100"
                    >
                      <div class="flex-fill">
                        <label class="input-field__label">
                          <span class="ml-1">От</span>
                          <input type="text" autocomplete="off" />
                        </label>
                      </div>
                      <div
                        class="bg-primary mx-1"
                        style="flex: 0 1 20px; height: 1px;"
                      ></div>
                      <div class="flex-fill">
                        <label class="input-field__label">
                          <span class="ml-1">До</span>
                          <input type="text" autocomplete="off" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-field">
                    <div class="input-field__title">ID договора</div>
                    <label class="input-field__label">
                      <input type="text" autocomplete="off" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="select-field mb-2">
                    <div class="select-field__title">
                      {{ 'region' | translate }}
                    </div>
                    <ng-select
                      class="custom-select"
                      appearance="outline"
                      [items]="opinion"
                      bindLabel="label"
                      bindValue="id"
                      placeholder="Выберите решение"
                      name="qwe"
                      [(ngModel)]="selectedOpinion"
                      [loadingText]="'Загружается'"
                      [searchable]="false"
                      [clearable]="false"
                    ></ng-select>
                    <!--      [disabled]=""-->
                    <!--      [loading]=""-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="select-field mb-2">
                    <div class="select-field__title">Филиал</div>
                    <ng-select
                      class="custom-select"
                      appearance="outline"
                      [items]="opinion"
                      bindLabel="label"
                      bindValue="id"
                      placeholder="Выберите решение"
                      name="qwe"
                      [(ngModel)]="selectedOpinion"
                      [loadingText]="'Загружается'"
                      [searchable]="false"
                      [clearable]="false"
                    ></ng-select>
                    <!--      [disabled]=""-->
                    <!--      [loading]=""-->
                  </div>
                </div>
              </div>

              <div class="page-form__actionbtn text-uppercase">
                <!--    (click)="clientDetail.nextStep()"-->
                найти
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  constructor() {}

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Дело возбуждено' },
    { id: 2, label: 'Отказано в возбуждении' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  ngOnInit(): void {}
}
