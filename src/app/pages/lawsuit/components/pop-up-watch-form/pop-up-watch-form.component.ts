import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-watch-form',
  templateUrl: './pop-up-watch-form.component.html',
  styleUrls: ['./pop-up-watch-form.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class PopUpWatchFormComponent implements OnInit {
  public isActive = false;
  // public formData = {
  //   processId: null,
  //   uniqueId: null,
  //   processMfo: '',
  //   actionId: null,
  //   actionNameLang: {
  //     en: '',
  //     ru: '',
  //     uz: '',
  //   },
  //   actionConfirmation: true,
  //   data: {
  //     id: null,
  //     uniqueId: null,
  //     mfo: '',
  //     active: true,
  //     createdAt: '',
  //     updatedAt: '',
  //     lastPaymentDate: '',
  //     text: '',
  //     files: [
  //       {
  //         id: null,
  //         name: '',
  //       },
  //     ],
  //   },
  //   actionStatus: null,
  //   processCreatedAt: '',
  //   processUpdatedAt: '',
  // };

  public formData!: any;

  wrapAlertState = 'end';

  popUpFormSub!: Subscription;

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.popUpFormSub = this.popUpInfoService.popUpForm$.subscribe(
      (popUpData: any) => {
        this.formData = popUpData.formData;
        this.isActive = popUpData.isActive;
      }
    );
  }

  close() {
    this.popUpInfoService.closePopUpHistoryAction(false);
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }

  ngOnDestroy(): void {
    if (this.popUpFormSub) {
      this.popUpFormSub.unsubscribe;
    }
  }
}
