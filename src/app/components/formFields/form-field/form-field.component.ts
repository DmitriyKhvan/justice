import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field">
      <div class="form-field__title" *ngIf="type !== 'checkbox'">
        {{ title }}
      </div>
      <div class="file-field__list mb-2" *ngIf="uploader.queue.length">
        <div
          *ngFor="let item of uploader.queue; index as i"
          class="file-field__list_item py-1"
        >
          <svg
            viewBox="0 0 36 36"
            class="circular-chart default"
            *ngIf="item.progress < 100"
          >
            <path
              class="circle-bg"
              d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
            <path
              class="circle"
              attr.stroke-dasharray="{{ item.progress }}, 100"
              d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
          </svg>
          <i *ngIf="item.progress === 100" class="icon-attach mr-1"></i>
          <div class="file-field__list_text ml-1">
            {{ item.file.name }}
          </div>
          <div class="position-relative">
            <i
              class="icon-close_2 ml-1 cursor-pointer"
              (click)="showTooltip($event)"
            ></i>
            <div class="tooltip tooltip-right">
              <div class="tooltip-content">Удалить файл?</div>
              <div class="tooltip-action">
                <button
                  class="btn btn-outlined-white mx-1"
                  (click)="hideTooltip($event)"
                >
                  Нет
                </button>
                <button
                  class="btn btn-filled-white"
                  (click)="deleteFile($event, item, i)"
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="file-field__list mb-2" *ngIf="type === 'file' && inputControl.value?.length">
        <div
          *ngFor="let item of inputControl.value; index as i"
          class="file-field__list_item py-1"
        >
          <i class="icon-attach mr-1"></i>
          <div class="file-field__list_text ml-1">
            {{ item.name }}
          </div>
        </div>
      </div>
      <label
        [ngClass]="{
          'custom-toggle-active': type === 'checkbox' && inputControl.value,
          'form-field__label': type !== 'checkbox',
          'custom-toggle': type === 'checkbox',
          'btn btn-dashed d-flex justify-content-center align-items-center':
            type === 'file',
          'text-field': type === 'textarea',
          'disabled-field': (type !== 'checkbox') && disabled,
          'display-none': (type === 'file') && disabled
        }"
        [ngSwitch]="type"
      >
        <!--        checkbox field      -->
        <input
          type="checkbox"
          #field
          [formControl]="inputControl"
          *ngSwitchCase="'checkbox'"
          (blur)="onTouch()"
        />
        <div
          class="d-flex align-items-center flex-nowrap"
          *ngSwitchCase="'checkbox'"
        >
          <div
            class="mr-1"
            [ngClass]="{
              'custom-toggle-checkbox': checkboxType === 'checkbox',
              'custom-toggle-track': checkboxType === 'toggle',
              'disabled-field': (type === 'checkbox') && disabled
            }"
            [ngSwitch]="checkboxType"
          >
            <i class="uil-check" *ngSwitchCase="'checkbox'"></i>
            <div class="custom-toggle-thumb" *ngSwitchCase="'toggle'"></div>
          </div>
          {{ title }}
        </div>
        <!--        checkbox field      -->

        <!--        text field      -->
        <input
          type="text"
          #field
          [formControl]="inputControl"
          *ngSwitchCase="'text'"
          autocomplete="off"
          (blur)="onTouch()"
        />
        <!--        text field      -->

        <!--        datepicker field      -->
        <input
          #field
          angular-mydatepicker
          name="mydate"
          (click)="dp.toggleCalendar()"
          [formControl]="inputControl"
          [options]="myDpOptions"
          #dp="angular-mydatepicker"
          [locale]="'ru'"
          autocomplete="off"
          *ngSwitchCase="'datepicker'"
          readonly
          (blur)="onTouch()"
        />
        <i class="icon-calendar" *ngSwitchCase="'datepicker'"></i>
        <!--        datepicker field      -->

        <!--        file field      -->
        <div *ngSwitchCase="'file'">
          {{
            uploader.queue?.length ? 'Добавить еще один файл' : 'Добавить файл'
          }}
        </div>
        <input
          #field
          type="file"
          name="fileUpload"
          id="fileUpload"
          multiple
          ng2FileSelect
          [uploader]="uploader"
          *ngSwitchCase="'file'"
          (blur)="onTouch()"
        />
<!--          [formControl]="inputControl"-->
        <!--        file field      -->

        <!--        select field      -->
        <ng-select
          #field
          class="custom-select w-100"
          appearance="outline"
          [items]="selectOptions"
          bindLabel="value"
          bindValue="key"
          placeholder="Выберите решение"
          [formControl]="inputControl"
          [loadingText]="'Загружается'"
          [searchable]="false"
          [clearable]="false"
          *ngSwitchCase="'select'"
          (blur)="onTouch()"
          [ngClass]="{
            'disabled-field': (type === 'select') && disabled
          }"
        ></ng-select>
        <!--        select field      -->

        <!--        textarea field      -->
        <textarea
          #field
          [formControl]="inputControl"
          placeholder="Уточните детали"
          *ngSwitchCase="'textarea'"
          (blur)="onTouch()"
        ></textarea>
        <!--        textarea field      -->
      </label>
      <div
        *ngIf="inputControl.touched"
        class="validation"
      >
        <small *ngIf="inputControl?.errors?.required">
          Введите данные
        </small>
      </div>
    </div>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent
  implements OnInit, ControlValueAccessor, AfterViewInit {
  @ViewChild('field') field!: ElementRef;

  @Input() type = '';
  @Input() checkboxType = 'checkbox'; // 'checkbox' || 'toggle' //
  @Input() title = '';
  @Input() selectOptions = [];

  @Output() isChecked: EventEmitter<any> = new EventEmitter();

  inputControl!: FormControl;
  onChange: any;
  onTouch: any;
  disabled = false;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    closeSelectorOnDateSelect: false,
    openSelectorTopOfInput: false,
  };

  attachmentList: any = [];

  options = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  constructor(private renderer: Renderer2) {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.response.subscribe((res) => {
      if (res && this.type === 'file') {
        const file = JSON.parse(res);
        this.attachmentList.push({
          id: file.id,
          name: file.fileName,
          type: file.extension,
        });
      }
    });
    this.uploader.onCompleteAll = () => {
      this.onChange(this.attachmentList);
    };
  }

  uploader: FileUploader = new FileUploader({
    url: environment.fileBaseUrl,
    autoUpload: true,
    method: 'POST',
    itemAlias: 'files',
    queueLimit: 10,
    isHTML5: true,
    // disableMultipart: true,
    // formatDataFunctionIsAsync: true,
    // formatDataFunction: async (item) => {
    //   return new Promise((resolve, reject) => {
    //     resolve({
    //       name: item._file.name,
    //       length: item._file.size,
    //       contentType: item._file.type,
    //       date: new Date(),
    //     });
    //   });
    // },
    parametersBeforeFiles: true,
    additionalParameter: {
      source: 'Justice',
    },
  });

  ngOnInit(): void {
    this.inputControl = new FormControl();
    this.inputControl.valueChanges.subscribe((val) => {
      // this.isChecked.emit(val);
      if (this.onChange) {
        if (this.type === 'datepicker') {
          this.onChange(val.singleDate?.formatted);
        } else {
          this.onChange(val);
        }
      }
    });
    this.uploader.clearQueue();
  }
  ngAfterViewInit(): void {
    // this.field.nativeElement.setAttribute('disabled', true);
    // if (this.type !== 'select') {
    //   this.renderer.setProperty(this.field.nativeElement, 'disabled', this.disabled);
    // }
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  showTooltip(evt: any): void {
    evt.target.nextElementSibling.classList.add('tooltip-active');
  }

  hideTooltip(evt: any): void {
    evt.preventDefault();
    evt.target.offsetParent.classList.remove('tooltip-active');
  }

  deleteFile(evt: any, item: any, idx: any): void {
    item.isUploading ? item.cancel() : this.attachmentList.splice(idx, 1);
    item.remove();
    this.hideTooltip(evt);
  }
}
