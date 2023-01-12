import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss'],
})
export class HistoryActionsComponent implements OnInit, OnDestroy {
  historyActionSub!: Subscription;
  dicSub!: Subscription;

  dictionaries!: any;

  constructor(
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService,
    public popUpWatchFormService: PopUpInfoService,
    private dicService: DictionariesService
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
    if (this.lawsuitService.fromStepId == 8) {
      this.dicSub = this.dicService
        .getDicByActionId(24)
        .subscribe((dictionaries: any) => {
          this.dictionaries = dictionaries;
        });
    }
  }

  getValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang[
        this.lawsuitService.translate.currentLang
      ];
    }
  }

  popUpForm(action: any) {
    this.popUpWatchFormService.openPopUpHistoryAction(true, action);
  }

  ngOnDestroy(): void {
    this.historyActionSub?.unsubscribe();
  }
}
