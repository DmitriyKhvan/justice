import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import {ClientsService} from '../../../services/clients.service';

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

  constructor(private router: Router, private route: ActivatedRoute, public clientsService: ClientsService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.accordionItemComponent.first.isFirst = true;
    this.accordionItemComponent.last.isLast = true;

    if (this.route.snapshot.routeConfig?.path === 'clients/history') {
      this.clientsService.contractInfo.subscribe(value => {
        this.accordionItemComponent.toArray().forEach((step: AccordionItemComponent, idx: number) => {
          value?.tasks.forEach((el: any) => {
            if (Number(el.task_step) === Number(step.step)) {
              step.status = el.task_status;
            }
          });
          step.stepNumber = step.step;
        });
      });
    }
  }

}
