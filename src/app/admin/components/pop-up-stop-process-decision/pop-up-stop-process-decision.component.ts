import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin, fromEvent, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-pop-up-stop-process-decision',
  templateUrl: './pop-up-stop-process-decision.component.html',
  styleUrls: ['./pop-up-stop-process-decision.component.scss'],
})
export class PopUpStopProcessDecisionComponent implements OnInit, OnDestroy {
  @ViewChild('wrapPopUpRight', { static: true }) wrapPopUpRight!: ElementRef;

  isActive: string = 'close';
  contract: any = {};
  formData: any = {};
  userInfo: any = {};
  users: any[] = [];

  renewalForm: string = 'close';

  popUpInfoSub!: Subscription;
  closePopUpInfoSub!: Subscription;
  stopFormSub!: Subscription;
  roleSub!: Subscription | undefined;

  form!: FormGroup;
  submitted = false;

  // decisions!: any;

  options = [
    { label: 'ФИО1', value: 1 },
    { label: 'ФИО2', value: 2 },
  ];

  constructor(
    private adminService: AdminService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService,
    private dicService: DictionariesService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.popUpInfoSub = this.popUpInfoService.popUpStopProcessDecision$
      .pipe(
        map((popUpData: any) => {
          this.isActive = popUpData.isActive;
          this.contract = popUpData.contract;
          if (popUpData.isActive === 'open') {
            this.formData = {
              actionId: 24,
              data: {
                addInfo: popUpData.contract.addInfo,
                createdAt: popUpData.contract.stopDate,
                docDate: popUpData.contract.docDate,
                docNumber: popUpData.contract.docNumber,
                files: popUpData.contract.files,
                renewalDate: popUpData.contract.renewalDate,
                stopInitiator: popUpData.contract.stopInitiator,
                stopReason: popUpData.contract.stopReason,
                type: popUpData.contract.type,
                uniqueId: popUpData.contract.contractId,
              },
            };
          }

          return { contract: popUpData.contract, isActive: popUpData.isActive };
        }),
        mergeMap((data: any) => {
          if (data.isActive === 'open') {
            console.log('contract', data.contract);

            const getUsers = this.adminService.getUsers({});
            const getUserInfo = this.adminService.getUserById(
              data.contract.stopBy
            );
            return forkJoin({ getUsers, getUserInfo });
          }

          return forkJoin();
        })
      )
      .subscribe((res: any) => {
        this.userInfo = res.getUserInfo;
        this.users = res.getUsers.map((user: any) => {
          return {
            fio: `${user.lastName} ${user.firstName?.slice(
              0,
              1
            )}. ${user.attributes.middleName[0]?.slice(0, 1)}.`,

            roles: user.attributes.roles.join(', '),
          };
        });
      });

    this.closePopUpInfoSub = fromEvent(
      this.wrapPopUpRight.nativeElement,
      'click'
    )
      .pipe(
        map((event: any) => event.target),
        tap((event: any) => {
          if (event.dataset.close) {
            this.form.reset();
            this.popUpInfoService.popUpStopProcessDecision('close');
            // clearInterval(this.lawsuitService.timerIdDecisions);
          }
        })
      )
      .subscribe();

    this.form = new FormGroup({
      initiator: new FormControl(null, Validators.required),
      role: new FormControl({ value: null, disabled: true }),
      additionalInfo: new FormControl(''),
    });

    this.roleSub = this.form
      .get('initiator')
      ?.valueChanges.subscribe((val: any) => {
        if (val) {
          this.form.patchValue({
            role: val.roles,
          });
        } else {
          this.form.patchValue({
            role: null,
          });
        }
      });
  }

  chengeRenewalForm(value: string) {
    this.renewalForm = value;
  }

  submitDecisionAction(processId: number, event: any) {
    console.log('this.contract', this.contract);

    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const data = {
      uniqueId: this.contract.contractId,
      mfo: this.contract.clientMfo,
      initiator: this.form.value.initiator,
      role: this.form.value.role,
      additionalInfo: this.form.value.additionalInfo,
      files: this.fileUploadService.transformFilesData(),
    };

    this.lawsuitService.getRenewalProcess(data).subscribe(
      (res) => {
        this.chengeRenewalForm('send');
        this.popUpInfoService.updateContractList$.next(true);
      },
      (error) => {},
      () => {
        this.submitted = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.popUpInfoSub?.unsubscribe();
  }
}
