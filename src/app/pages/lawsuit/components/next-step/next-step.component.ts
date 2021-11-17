import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss'],
})
export class NextStepComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  steps: any[] = [];
  actions: any[] = [];

  constructor(
    private alert: AlertService,
    private lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.lawsuitService.getSteps().subscribe((steps) => {
      this.steps = steps;
    });

    this.form = new FormGroup({
      nextStep: new FormControl(null, Validators.required),
      nextAction: new FormControl(null, Validators.required),
    });
  }

  setActionStep(event: any) {
    this.form.reset({ ...this.form.value, nextAction: null });
    console.log(event);
    if (event) {
      this.actions = event.actions;
    } else {
      this.actions = [];
      this.form.reset();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

    // this.lawsuit.requestAction().subscribe(
    //   () => {
    //     this.alert.success('Запрос отправлен');
    //   },
    //   (error) => {
    //     this.submitted = false;
    //     this.alert.danger('Запрос не отправлен');
    //   }
    // );
  }
}
