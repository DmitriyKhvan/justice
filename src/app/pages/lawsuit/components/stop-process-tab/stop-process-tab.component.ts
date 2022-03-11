import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stop-process-tab',
  templateUrl: './stop-process-tab.component.html',
  styleUrls: ['./stop-process-tab.component.scss'],
})
export class StopProcessTabComponent implements OnInit, OnDestroy {
  sSub!: Subscription;

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {
    this.sSub = this.lawsuitService
      .getSteps()
      .pipe(
        map((steps: any) => {
          return steps.find((step: any) => step.id === 8);
        })
      )
      .subscribe((stopProcessStep: any) => {
        this.lawsuitService.stopProcessStep = stopProcessStep;
      });
  }

  ngOnDestroy(): void {
    this.sSub?.unsubscribe();
  }
}
