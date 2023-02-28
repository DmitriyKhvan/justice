import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { datepickerSettings } from 'src/app/settings';

@Component({
  selector: 'app-stop-process-type',
  templateUrl: './stop-process-type.component.html',
  styleUrls: ['./stop-process-type.component.scss'],
})
export class StopProcessTypeComponent implements OnInit, OnDestroy {
  @Input() formTemplate: any = null;
  @Input() action!: any;

  sSub!: Subscription;
  dSub!: Subscription | undefined;
  stopInitiatorSub!: Subscription | undefined;
  stopReasonSub!: Subscription | undefined;

  dictionaries!: any;
  reasonStoppingDic: any[] = [];
  // action!: any;

  form!: FormGroup;
  stopReason!: any;
  renewalDate!: any;

  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService,
    public fileUploadService: FileUploadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sSub = this.lawsuitService
      .getSteps()
      .pipe(
        map((steps: any) => {
          const stopProcessStep = steps.find((step: any) => step.id === 8);
          return stopProcessStep?.actions.find(
            (action: any) => action.id === 24
          );
        })
      )
      .subscribe((action: any) => {
        this.dicService
          .getDicByActionId(action?.id)
          .subscribe((dictionaries: any) => {
            this.dictionaries = dictionaries;
            console.log('this.dictionaries', this.dictionaries);
          });
      });

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
      type: new FormControl(formTemplateNull, Validators.required),
      renewalDateCheck: new FormControl(formTemplate),
      renewalDate: new FormControl({ value: null, disabled: true }),
      docDate: new FormControl(formTemplate, Validators.required),
      docNumber: new FormControl(formTemplate, Validators.required),
      stopInitiator: new FormControl(formTemplateNull, Validators.required),
      stopReason: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      other: new FormControl(formTemplate, Validators.required),
      addInfo: new FormControl(formTemplate, Validators.required),
    });

    this.stopReason = this.form.get('stopReason');
    this.renewalDate = this.form.get('renewalDate');

    // this.sSub = this.lawsuitService
    //   .getSteps()
    //   .pipe(
    //     map((steps: any) => {
    //       this.action = steps.at(-1)?.actions[0];
    //       return this.action;
    //     }),
    //     mergeMap((action: any) => this.dicService.getDicByActionId(action?.id))
    //   )

    this.dSub = this.form
      .get('renewalDateCheck')
      ?.valueChanges.subscribe((check: any) => {
        this.form.patchValue({
          renewalDate: '',
        });

        if (check) {
          this.renewalDate?.setValidators([Validators.required]);
          this.renewalDate?.enable();
        } else {
          this.renewalDate?.clearValidators();
          this.renewalDate?.disable();
        }

        this.renewalDate?.clearValidators();
      });

    this.stopInitiatorSub = this.form
      .get('stopInitiator')
      ?.valueChanges.subscribe((id) => {
        this.reasonStoppingDic = [];
        if (id) {
          this.reasonStoppingDic = this.dictionaries.stopInitiator.find(
            (e: any) => e.id === id
          ).child.data;

          this.stopReason?.enable();
        } else {
          this.form.patchValue({
            stopReason: null,
          });
          this.stopReason?.disable();
        }
      });

    this.stopReasonSub = this.form
      .get('stopReason')
      ?.valueChanges.subscribe((id) => {
        this.form.patchValue({
          other: '',
        });

        if (id === 154) {
          this.form.get('other')?.setValidators([Validators.required]);
        } else {
          this.form.get('other')?.clearValidators();
        }
        this.form.get('other')?.updateValueAndValidity();
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      type: this.form.value.type,
      renewalDate: this.form.value.renewalDate?.singleDate.formatted,
      docDate: this.form.value.docDate.singleDate.formatted,
      docNumber: this.form.value.docNumber,
      stopInitiator: this.form.value.stopInitiator,
      stopReason: this.form.value.stopReason,
      other: this.form.value.other,
      files: this.fileUploadService.transformFilesData(),
      addInfo: this.form.value.addInfo,
    };

    this.lawsuitService
      .apiFetch(data, 'process/stop/add', this.action?.id)
      .pipe(
        mergeMap(() => {
          return this.lawsuitService.getContractInfo(
            this.route.snapshot.queryParams['contractId']
          );
        })
      )
      .subscribe(
        (contract) => {
          // this.lawsuitService.historyActions = actions;
          this.lawsuitService.contract = contract;

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
    this.sSub?.unsubscribe();
    this.dSub?.unsubscribe();
    this.stopInitiatorSub?.unsubscribe();
  }
}
