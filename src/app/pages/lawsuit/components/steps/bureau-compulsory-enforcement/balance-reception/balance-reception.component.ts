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
  selector: 'app-balance-reception',
  templateUrl: './balance-reception.component.html',
  styleUrls: ['./balance-reception.component.scss'],
})
export class BalanceReceptionComponent implements OnInit {
  @Input() formTemplate: any = null;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  proposedAmountSub!: Subscription | undefined;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;
  dicSub!: Subscription;

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
      inDocNumber: new FormControl(formTemplateNull, Validators.required),
      inDocDate: new FormControl(formTemplateNull, Validators.required),
      proposedAmount: new FormControl(formTemplateNull, Validators.required),
      notificationPeriod: new FormControl(
        formTemplateNull,
        Validators.required
      ),
      addInfo: new FormControl(formTemplateNull, Validators.required),
    });

    this.dicSub = this.dicService
      .getDicByActionId(this.action.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });

    this.proposedAmountSub = this.form
      .get('proposedAmount')
      ?.valueChanges.subscribe((val) => {
        this.form.patchValue(
          {
            proposedAmount: currencyTransform(val),
          },
          { emitEvent: false }
        );
      });
  }

  submit(actionId: number) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      inDocNumber: this.form.value.inDocNumber,
      inDocDate: this.form.value.inDocDate.singleDate.formatted,
      proposedAmount: this.form.value.proposedAmount,
      notificationPeriod: this.form.value.notificationPeriod.singleDate
        .formatted,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService
      .apiFetch(data, 'mib/balanceReception/add', actionId)
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
    this.proposedAmountSub?.unsubscribe();
  }
}
