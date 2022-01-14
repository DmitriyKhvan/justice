import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-template-text',
  templateUrl: './pop-up-template-text.component.html',
  styleUrls: ['./pop-up-template-text.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class PopUpTemplateTextComponent implements OnInit, OnDestroy {
  public isActive = false;

  wrapAlertState = 'end';

  popUpTextSub!: Subscription;
  listTextSub!: Subscription;
  removeTextSub!: Subscription;

  listText: any[] = [];

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.popUpTextSub = this.popUpInfoService.popUpTextTemplate$
      .pipe(
        tap((data: any) => {
          this.isActive = data.isActive;
        }),
        switchMap(() => {
          return this.lawsuitService.listTextTemplate();
        })
      )
      .subscribe((listText: any) => {
        this.listText = listText;
      });
  }

  close() {
    this.popUpInfoService.popUpTextTemplate(false);
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }

  confirmRemoveText(event: any) {
    event.stopPropagation();
    const el = event.target.closest('.textItem');

    el.classList.add('active');

    el.nextElementSibling.classList.add('active');
  }

  removeText(event: any, id: number) {
    this.cancel(event);
    this.removeTextSub = this.lawsuitService
      .removeTextTemplate(id)
      .subscribe(() => {
        this.alert.success('Шаблон удален.');
        this.listText = this.listText.filter((text) => text.id !== id);
      });
  }

  cancel(event: any) {
    const el = event.target.closest('.confirmText');
    el.classList.remove('active');
    el.previousElementSibling.classList.remove('active');
  }

  selectTemplate(text: string) {
    this.popUpInfoService.popUpTextTemplate(false, text);
  }

  ngOnDestroy(): void {
    if (this.popUpTextSub) {
      this.popUpTextSub.unsubscribe();
    }

    if (this.listTextSub) {
      this.listTextSub.unsubscribe();
    }

    if (this.removeTextSub) {
      this.removeTextSub.unsubscribe();
    }
  }
}
