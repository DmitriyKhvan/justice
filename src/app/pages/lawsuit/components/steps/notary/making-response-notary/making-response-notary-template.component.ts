import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-making-response-notary-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">№ вх. документа</div>
        <div class="col-6">{{ actionData.data.inDocNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дата вх. документа</div>
        <div class="col-6">{{ actionData.data.inDocDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MakingResponseNotaryTemplateComponent implements OnInit {
  @Input() actionData!: any;
  constructor() {}

  ngOnInit(): void {}
}
