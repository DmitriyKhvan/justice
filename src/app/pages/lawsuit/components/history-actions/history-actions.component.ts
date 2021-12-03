import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss'],
})
export class HistoryActionsComponent implements OnInit, OnChanges {
  constructor(
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(() => console.log('history actions')),
        switchMap((params: Params) => {
          this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
          this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
            'stepId'
          ];

          this.lawsuitService.contractId = this.route.snapshot.queryParams[
            'contractId'
          ];
          return this.lawsuitService.getStepActions(
            this.route.snapshot.queryParams
          );
        })
      )
      .subscribe((histories) => {
        this.lawsuitService.actionIds = [];

        this.lawsuitService.historyActions = histories.actions.filter(
          (action: any) =>
            action.actionStatus !== 0 && action.actionStatus !== 4
        );

        this.lawsuitService.actionStart = histories.actions.find(
          (action: any) => action.data === null
        );

        if (this.lawsuitService.actionStart) {
          this.lawsuitService.actionIds.push(
            this.lawsuitService.actionStart.actionId
          );
        }

        this.lawsuitService.historySteps = histories.jumps;
        this.lawsuitService.isDeniedStep = this.lawsuitService.historySteps.some(
          (step) => step.status === 1
        );
      });

    // this.route.queryParams.subscribe((val) => {
    //   // debugger;
    //   console.log('val', val);
    // });
  }
}
