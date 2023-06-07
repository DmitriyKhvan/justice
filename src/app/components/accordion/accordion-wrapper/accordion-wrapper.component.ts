import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { ClientsService } from '../../../services/clients.service';
import { Subscription } from 'rxjs';
import { StepComponent } from '../../stepper/step/step.component';

@Component({
  selector: 'app-accordion-wrapper',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class AccordionWrapperComponent implements OnInit, AfterContentInit {
  @ContentChildren(AccordionItemComponent)
  accordionItemComponent!: QueryList<AccordionItemComponent>;
  currentStep = 1;

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.accordionItemComponent.last.isLast = true;
    this.accordionItemComponent
      .toArray()
      .forEach((step: AccordionItemComponent, idx: number) => {
        step.currentStep = this.currentStep;
        step.stepNumber = step.step;
      });
  }
}
