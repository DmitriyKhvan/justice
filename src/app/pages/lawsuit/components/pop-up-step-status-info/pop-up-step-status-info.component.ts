import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { bounce } from 'ng-animate';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-step-status-info',
  templateUrl: './pop-up-step-status-info.component.html',
  styleUrls: ['./pop-up-step-status-info.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class PopUpStepStatusInfoComponent implements OnInit, OnDestroy {
  public isActive = false;

  public statusInfo!: any;
  wrapAlertState = 'end';

  popUpInfoSub!: Subscription;

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.popUpInfoSub = this.popUpInfoService.popUpStepStatusInfo$.subscribe(
      (popUpData) => {
        this.statusInfo = popUpData.statusInfo;
        this.isActive = popUpData.isActive;
      }
    );
  }

  close() {
    this.popUpInfoService.popUpStepStatusInfo(false);
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }

  ngOnDestroy(): void {
    this.popUpInfoSub?.unsubscribe();
  }
}
