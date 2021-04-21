import {
  Component,
  OnInit,
  Input,
  Host,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { StepperComponent } from '../stepper.component';
declare var $: any;
@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  stepNumber = 0;
  isLast = false;
  isFirst = false;
  currentStep = 1;

  constructor() {}

  ngOnInit(): void {
    console.log('step');
  }
}
