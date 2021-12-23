import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-step-info',
  templateUrl: './pop-up-step-info.component.html',
  styleUrls: ['./pop-up-step-info.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class PopUpStepInfoComponent implements OnInit, OnDestroy {
  public isActive = false;
  // public stepInfo = {
  //   createdAt: '',
  //   id: null,
  //   mfo: '',
  //   status: null,
  //   toAction: {
  //     id: null,
  //     lang: {
  //       en: '',
  //       ru: '',
  //       uz: '',
  //     },
  //     name: '',
  //   },
  //   toStep: {
  //     id: 4,
  //     lang: {
  //       en: '',
  //       ru: '',
  //       uz: '',
  //     },
  //     name: '',
  //   },
  //   uniqueId: null,
  //   updatedAt: '',
  // };

  public stepInfo!: any;

  wrapAlertState = 'end';

  popUpInfoSub!: Subscription;

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.popUpInfoSub = this.popUpInfoService.popUpStepInfo$.subscribe(
      (popUpData: any) => {
        this.stepInfo = popUpData.stepInfo;
        this.isActive = popUpData.isActive;
      }
    );
  }

  close() {
    this.popUpInfoService.closePopUpHistoryStep(false);
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }

  ngOnDestroy(): void {
    if (this.popUpInfoSub) {
      this.popUpInfoSub.unsubscribe();
    }
  }
}
