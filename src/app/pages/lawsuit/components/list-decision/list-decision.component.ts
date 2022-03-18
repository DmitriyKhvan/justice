import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-list-decision',
  templateUrl: './list-decision.component.html',
  styleUrls: ['./list-decision.component.scss'],
})
export class ListDecisionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formm!: FormGroup;

  submitted = false;

  sSub!: Subscription;

  // decisions!: any;

  options = [
    { label: 'Отказать', value: 1 },
    { label: 'Одобрить', value: 3 },
  ];

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(''),
    });

    this.formm = new FormGroup({
      actionsForm: new FormArray([]),
    });

    this.sSub = this.lawsuitService
      .getPending(this.route.snapshot.queryParams)
      .subscribe((decisions) => {
        const resArr = { ...this.lawsuitService.decisions, ...decisions };

        resArr.actions = resArr.actions.filter(
          (v: any, i: any, a: any) =>
            a.findIndex((t: any) => JSON.stringify(t) === JSON.stringify(v)) ===
            i
        );

        this.lawsuitService.decisions = resArr;

        for (let i = 0; i < this.lawsuitService.decisions.actionsCount; i++) {
          const actionForm = new FormGroup({
            decision: new FormControl(null, Validators.required),
            additionalInfo: new FormControl(''),
          });

          this.actionsForm.push(actionForm);
        }

        console.log(this.formm);
      });
  }

  get actionsForm() {
    return this.formm.get('actionsForm') as FormArray;
  }

  toggleDecision(event: any) {
    event.target.closest('.decision_value').classList.toggle('active');
  }

  submitDecisionAction(processId: number, event: any, idx: number) {
    if (this.actionsForm.controls[idx].invalid) {
      return;
    }
    this.submitted = true;

    const data = {
      processId,
      status: this.actionsForm.controls[idx].value.decision,
      headLawyerInfo: this.actionsForm.controls[idx].value.additionalInfo,
      headLawyerFiles: this.fileUploadService.transformFilesData(),
    };

    this.lawsuitService.confirmAction(data, 'process/confirmAction').subscribe(
      (decisions) => {
        // this.lawsuitService.historyActions = actions;
        const el = event.target.closest('.decision_form')
          .previousElementSibling;
        el.classList.toggle('active');
        el.classList.add('complete');

        this.submitted = false;
        this.formm.reset();

        this.popUpInfoService.updateContractList$.next(true);

        setTimeout(() => {
          this.lawsuitService.decisions = decisions;
        }, 3000);
        // this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        // this.alert.danger('Форма не оформлена');
      }
    );
  }

  submitDecisionStep(jumpId: number, event: any) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      jumpId,
      status: this.form.value.decision,
      headLawyerInfo: this.form.value.additionalInfo,
    };

    this.lawsuitService.confirmAction(data, 'process/confirmStep').subscribe(
      (decisions) => {
        // this.lawsuitService.historyActions = actions;
        const el = event.target.closest('.decision_form')
          .previousElementSibling;
        el.classList.toggle('active');
        el.classList.add('complete');

        this.submitted = false;
        this.form.reset();

        this.popUpInfoService.updateContractList$.next(true);
        setTimeout(() => {
          this.lawsuitService.decisions = decisions;
        }, 3000);
        // this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        // this.alert.danger('Форма не оформлена');
      }
    );
  }

  ngOnDestroy(): void {
    this.sSub?.unsubscribe();
  }
}
