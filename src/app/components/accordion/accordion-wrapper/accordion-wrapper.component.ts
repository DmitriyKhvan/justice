import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion-wrapper',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
  ]
})
export class AccordionWrapperComponent implements OnInit, AfterContentInit {

  @ContentChildren(AccordionItemComponent) accordionItemComponent!: QueryList<AccordionItemComponent>;
  currentStep = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.currentStep = val.step;
    });
  }

  ngAfterContentInit(): void {
    // console.log(this.stepComponent);
    this.accordionItemComponent.first.isFirst = true;
    this.accordionItemComponent.last.isLast = true;
    this.accordionItemComponent.toArray().forEach((step: AccordionItemComponent, idx: number) => {
      step.currentStep = this.currentStep;
      step.stepNumber = step.step;
    });
  }

}
