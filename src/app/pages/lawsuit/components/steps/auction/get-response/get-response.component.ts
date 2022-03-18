import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';
import currencyTransform from 'src/app/utils/format-number';

@Component({
  selector: 'app-get-response',
  templateUrl: './get-response.component.html',
  styleUrls: ['./get-response.component.scss'],
})
export class GetResponseComponent implements OnInit {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  dicSub!: Subscription;
  resultSub!: Subscription | undefined;
  lotSumSub!: Subscription | undefined;

  lotSum!: any;

  dictionaries!: any;
  districtDic: any[] = [];

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    let formTemplate: any = '';
    let formTemplateNull: any = null;

    if (this.formTemplate) {
      this.action = {
        actionId: this.formTemplate.id,
      };

      formTemplate = { value: '', disabled: true };
      formTemplateNull = { value: null, disabled: true };
    }

    this.form = new FormGroup({
      lotNumber: new FormControl(formTemplateNull, Validators.required),
      endDateLot: new FormControl(formTemplate, Validators.required),
      result: new FormControl(formTemplateNull, Validators.required),
      lotSum: new FormControl({ value: '', disabled: true }),
      addInfo: new FormControl(formTemplate, Validators.required),
    });

    this.lotSum = this.form.get('lotSum');

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

    this.resultSub = this.form
      .get('result')
      ?.valueChanges.subscribe((val: any) => {
        this.form.patchValue({
          lotSum: '',
        });

        this.toggleValidatorsLotSum(val);
      });

    this.lotSumSub = this.lotSum?.valueChanges.subscribe((val: any) => {
      this.form.patchValue(
        {
          lotSum: currencyTransform(val),
        },
        { emitEvent: false }
      );
    });
  }

  toggleValidatorsLotSum(result: any) {
    if (result === 164) {
      this.lotSum?.setValidators([Validators.required]);
      this.lotSum.enable();
    } else {
      this.lotSum?.clearValidators();
      this.lotSum.disable();
    }

    this.lotSum.updateValueAndValidity();
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      lotNumber: this.form.value.lotNumber,
      endDateLot: this.form.value.endDateLot.singleDate.formatted,
      result: this.form.value.result,
      lotSum: this.form.value.lotSum,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService
      .apiFetch(data, 'auction/getResponse/add', actionId)
      .subscribe(
        (actions) => {
          // this.lawsuitService.historyActions = actions;

          this.alert.success('Форма оформлена');
        },
        (error) => {
          // this.alert.danger('Форма не оформлена');
        },
        () => {
          this.submitted = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.dicSub?.unsubscribe();
  }
}
