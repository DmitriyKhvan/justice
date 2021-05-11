import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { StepComponent } from '../step/step.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stepper-wrapper',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class StepperWrapperComponent implements OnInit, AfterContentInit {
  @ContentChildren(StepComponent) stepComponent!: QueryList<StepComponent>;
  currentStep = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((val) => {
    //   this.currentStep = val.step;
    // });
  }

  ngAfterContentInit(): void {
    // console.log(this.stepComponent);
    this.stepComponent.first.isFirst = true;
    this.stepComponent.last.isLast = true;
    this.stepComponent.toArray().forEach((step: StepComponent, idx: number) => {
      // step.currentStep = this.currentStep;
      // step.stepNumber = step.step;
    });
  }
}
