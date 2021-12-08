import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-form-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">Последний срок погашения кредита</div>
        <div class="col-6">{{ actionData.data.lastPaymentDate }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Дополнительная информация</div>
        <div class="col-6">{{ actionData.data.text }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">Прикрепленные файлы</div>
        <div class="col-6">
          <div class="fileList" *ngFor="let file of actionData.data.files">
            <i class="icon-attach mr-1"></i>
            <div class="file-field__list_text ml-1">
              {{ file.name }}
            </div>
          </div>
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
