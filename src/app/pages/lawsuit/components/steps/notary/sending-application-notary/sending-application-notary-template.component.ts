import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sending-application-notary-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'outDocNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.outDocNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'outDocDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.outDocDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'attached_files' | translate }}</div>
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
export class SendingApplicationNotaryTemplateComponent implements OnInit {
  @Input() actionData!: any;
  constructor() {}

  ngOnInit(): void {}
}
