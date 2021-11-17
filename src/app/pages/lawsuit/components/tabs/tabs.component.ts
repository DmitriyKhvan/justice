import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @ViewChildren('stepRef') stepsRef!: QueryList<ElementRef>;

  constructor(
    public lawsuitService: LawsuitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

    this.lawsuitService.getCurrentStep(stepId);
  }
}
