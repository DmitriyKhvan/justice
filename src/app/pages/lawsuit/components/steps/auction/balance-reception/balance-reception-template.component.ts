import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-balance-reception-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Входящий номер документа</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата Входящего документа</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
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
export class BalanceReceptionTemplateComponent implements OnInit {
  @Input() actionData!: any;

  constructor() {}

  ngOnInit(): void {}
}
