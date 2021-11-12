import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @ViewChildren('stepRef') stepsRef!: QueryList<ElementRef>;

  steps: any[] = [
    { id: 1, name: 'Уведомление', status: 'complete' },
    { id: 2, name: 'Процесс работы с ТПП', status: 'last' },
  ];

  constructor(private lawsuitService: LawsuitService) {}

  ngOnInit(): void {}

  getStep({ stepId, event, idx, stepName }: any) {
    this.lawsuitService.stepName = stepName;
    this.lawsuitService.stepIndex = idx + 1;

    console.log(this.stepsRef.toArray());
    this.stepsRef.toArray().forEach((step) => {
      step.nativeElement.classList.remove('current');
    });

    console.log('event', event);

    event.classList.add('current');

    // if (event.target.parentNode.classList.contains('step_lawsuit')) {
    //   event.target.parentNode.classList.add('current');
    // } else if (event.target.classList.contains('step_lawsuit')) {
    //   event.target.classList.add('current');
    // }
  }
}
