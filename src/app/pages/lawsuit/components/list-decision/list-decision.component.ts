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

  options = [
    { label: 'refuse', value: 1 },
    { label: 'approve', value: 3 },
  ];

  submitted = false;

  sSub!: Subscription;

  // decisions!: any;

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,

    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(''),
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
      });
  }

  toggleDecision(event: any) {
    event.target.closest('.decision_value').classList.toggle('active');
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
