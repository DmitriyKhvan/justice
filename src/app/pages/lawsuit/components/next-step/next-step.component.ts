import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss'],
})
export class NextStepComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;

  restSteps: any[] = [];
  allStepLength!: null;
  actions: any[] = [];

  sSub!: Subscription;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService,
    public popUpWatchFormService: PopUpInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sSub = this.lawsuitService.getSteps().subscribe((steps) => {
      this.allStepLength = steps.length;

      if (this.lawsuitService.currentStep.stepid === 1) {
        this.restSteps = steps.filter(
          (step: any) =>
            !this.lawsuitService.steps.some(
              (e) => e.stepid === step.id || step.id === 6 || step.id === 8
            )
        );
      } else {
        this.restSteps = steps.filter(
          (step: any) =>
            !this.lawsuitService.steps.some(
              (e) => e.stepid === step.id || step.id === 8
            )
        );
      }
    });

    this.form = new FormGroup({
      nextStep: new FormControl(null, Validators.required),
      nextAction: new FormControl(null, Validators.required),
    });
  }

  setActionStep(event: any) {
    this.form.reset({ ...this.form.value, nextAction: null });
    if (event) {
      this.actions = event.actions;
    } else {
      this.actions = [];
      this.form.reset();
    }
  }

  popUpTemplateForm(action: any) {
    this.popUpWatchFormService.popUpFormTemplate(true, action);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      uniqueId: this.lawsuitService.contractId,
      mfo: this.lawsuitService.mfo,
      fromStepId: this.lawsuitService.fromStepId,
      toActionId: this.form.value.nextAction,
      toStepId: this.form.value.nextStep,
    };

    this.lawsuitService.apiFetch(data, 'process/nextStep', null).subscribe(
      (actions) => {
        // this.lawsuitService.historyActions = actions;
        this.submitted = false;
        this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        // this.alert.danger('Форма не оформлена');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sSub) {
      console.log('next-step-destroy');

      this.sSub.unsubscribe();
    }
  }
}
