import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-template-form',
  templateUrl: './pop-up-template-form.component.html',
  styleUrls: ['./pop-up-template-form.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class PopUpTemplateFormComponent implements OnInit {
  public isActive = false;

  public formTemplate!: any;

  wrapAlertState = 'end';

  popUpFormSub!: Subscription;

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.popUpFormSub = this.popUpInfoService.popUpFormTemplate$.subscribe(
      (popUpData: any) => {
        console.log(popUpData);

        this.formTemplate = popUpData.formTemplate;
        this.isActive = popUpData.isActive;
      }
    );
  }

  close() {
    this.popUpInfoService.popUpFormTemplate$.next(false);
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
