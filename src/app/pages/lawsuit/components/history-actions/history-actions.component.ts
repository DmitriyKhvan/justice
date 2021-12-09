import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss'],
})
export class HistoryActionsComponent implements OnInit, OnDestroy {
  historyActionSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService,
    public popUpWatchFormService: PopUpInfoService
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .pipe(
    //     tap(() => console.log('history actions')),
    //     switchMap((params: Params) => {
    //       this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
    //       this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
    //         'stepId'
    //       ];

    //       this.lawsuitService.contractId = this.route.snapshot.queryParams[
    //         'contractId'
    //       ];
    //       return this.lawsuitService.getStepActions(
    //         this.route.snapshot.queryParams
    //       );
    //     })
    //   )
    //   .subscribe((histories) => {
    //     console.log('histories', histories);

    //     this.lawsuitService.actionIds = [];

    //     this.lawsuitService.historyActions = histories.actions.filter(
    //       (action: any) =>
    //         action.actionStatus !== 0 && action.actionStatus !== 4
    //     );

    //     this.lawsuitService.actionStart = histories.actions.find(
    //       (action: any) => action.data === null
    //     );

    //     if (this.lawsuitService.actionStart) {
    //       this.lawsuitService.actionIds.push(
    //         this.lawsuitService.actionStart.actionId
    //       );
    //     }

    //     this.lawsuitService.historySteps = histories.jumps;
    //     this.lawsuitService.isDeniedStep = this.lawsuitService.historySteps.some(
    //       (step) => step.status === 1
    //     );
    //   });

    console.log('this.lawsuitService.mfo', this.lawsuitService.mfo);
    console.log(
      'this.lawsuitService.contractId',
      this.lawsuitService.contractId
    );
    console.log(
      'this.lawsuitService.fromStepId',
      this.lawsuitService.fromStepId
    );

    this.historyActionSub = this.lawsuitService
      .getStepActions({
        mfo: this.lawsuitService.mfo,
        contractId: this.lawsuitService.contractId,
        stepId: this.lawsuitService.fromStepId,
      })
      .subscribe((histories) => {
        console.log('histories', histories);

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
  }

  popUpForm(action: any) {
    this.popUpWatchFormService.openPopUpHistoryAction(true, action);
  }

  ngOnDestroy(): void {
    if (this.historyActionSub) {
      this.historyActionSub.unsubscribe();
    }
  }
}
