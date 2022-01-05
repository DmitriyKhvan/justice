import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
export class HistoryActionsComponent implements OnInit, DoCheck, OnDestroy {
  historyActionSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService,
    public popUpWatchFormService: PopUpInfoService
  ) {}

  ngOnInit(): void {
    // this.historyActionSub = this.lawsuitService
    //   .getStepActions({
    //     mfo: this.lawsuitService.mfo,
    //     contractId: this.lawsuitService.contractId,
    //     stepId: this.lawsuitService.fromStepId,
    //   })
    //   .subscribe((histories) => {
    //     // console.log('histories', histories);
    //     this.lawsuitService.actions = [];
    //     this.lawsuitService.historyActions = histories.actions.filter(
    //       (action: any) =>
    //         action.actionStatus !== 0 && action.actionStatus !== 4
    //     );
    //     this.lawsuitService.actionStart = histories.actions.find(
    //       (action: any) => action.data === null
    //     );
    //     // console.log(
    //     //   'this.lawsuitService.actionStart',
    //     //   this.lawsuitService.actionStart
    //     // );
    //     if (this.lawsuitService.actionStart) {
    //       this.lawsuitService.actions.push(
    //         // this.lawsuitService.actionStart.actionId
    //         this.lawsuitService.actionStart
    //       );
    //     }
    //     this.lawsuitService.historySteps = histories.jumps;
    //     this.lawsuitService.isDeniedStep = this.lawsuitService.historySteps.some(
    //       (step) => step.status === 1
    //     );
    //   });
  }

  ngDoCheck() {
    // console.log('DoCheck');
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
