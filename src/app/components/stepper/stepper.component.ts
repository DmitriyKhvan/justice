import {
  EventEmitter,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { OnDestroy, OnChanges, AfterContentInit } from '@angular/core';

import { StepComponent } from './step/step.component';

declare var $: any;

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnChanges{
  private currentStep = 2;
  private internalSteps!: QueryList<StepComponent>;

  @Input() datepicker = '';

  @Input() counter = 1;
  @Output() counterChange = new EventEmitter<number>();

  ngOnInit(): void {
    console.log('stepper');
    $(this.datepicker).datepicker({
      // minDate: new Date(),
      inline: false,
      todayButton: new Date(),
      autoClose: true,
      dateFormat: 'M yyyy',
      // timepicker: true,
      // timeFormat: 'hh:ii AA',
      // onSelect: function onSelect(fd: string, date: any, inst: object): void {
      //   setTaskDeadline(date);
      // },
    });
  }

  ngOnChanges(): void {
    this.currentStep = this.counter;
    if (this.internalSteps) {
      this.setChildSteps();
    }
  }

  @ContentChildren(StepComponent)
  set stepsContent(steps: QueryList<StepComponent>) {
    if (steps) {
      this.internalSteps = steps;
      this.internalSteps.last.isLast = true;
      this.internalSteps.first.isFirst = true;
      this.registerSteps();
    }
  }

  nextStep(): void {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  prevStep(): void {
    this.counter--;
    this.counterChange.emit(this.counter);
  }

  setStep(step: any): void {
    this.counterChange.emit(step);
  }

  private registerSteps(): void {
    this.internalSteps.toArray().forEach((step: StepComponent, idx: number) => {
      step.currentStep = this.currentStep;
      step.stepNumber = idx + 1;
    });
  }

  private setChildSteps(): void {
    this.internalSteps.toArray().forEach((step: StepComponent, idx: number) => {
      step.currentStep = this.currentStep;
    });
  }
}
