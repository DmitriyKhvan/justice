import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-form-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'last_loan_repayment_date' | translate }}</div>
        <div class="col-6">{{ actionData.data.lastPaymentDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.text }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'attached_files' | translate }}</div>
        <div class="col-6">
          <!-- <app-file-uploader [formData]="actionData"></app-file-uploader> -->
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NotificationFormTemplateComponent implements OnInit {
  @Input() actionData!: any;

  constructor() {}

  ngOnInit(): void {}
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-notification-form-template',
//   template: ``,
//   styles: [],
// })
// export class NotificationFormTemplateComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }
