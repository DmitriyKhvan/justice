import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <div
      [class]="isActive"
      class="wrap-pop-up-right"
      data-close="true"
      #wrapPopUpRight
    >
      <div class="content-pop-up-right">
        <app-sidebar-list *ngIf="isActive === 'open'"></app-sidebar-list>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('wrapPopUpRight', { static: true }) wrapPopUpRight!: ElementRef;

  isActive!: string;
  popUpInfoSub!: Subscription;
  closePopUpInfoSub!: Subscription;

  constructor(private popUpInfoService: PopUpInfoService) {}

  ngOnInit(): void {
    this.popUpInfoSub = this.popUpInfoService.popUpListNotification$.subscribe(
      (popUpData: any) => {
        this.isActive = popUpData.isActive;
      }
    );

    this.closePopUpInfoSub = fromEvent(
      this.wrapPopUpRight.nativeElement,
      'click'
    )
      .pipe(
        map((event: any) => event.target),
        tap((event: any) => {
          if (event.dataset.close) {
            this.popUpInfoService.popUpListNotification('close');
            // clearInterval(this.lawsuitService.timerIdDecisions);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.popUpInfoSub?.unsubscribe();
    this.closePopUpInfoSub?.unsubscribe();
  }
}
