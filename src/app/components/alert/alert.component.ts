import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class AlertComponent implements OnInit, OnDestroy {
  // @Input() delay = 1000000;

  public text!: string;
  public type = 'success';
  wrapAlertState = 'end';

  aSub!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;

      // const timeout = setTimeout(() => {
      //   clearTimeout(timeout);
      //   this.text = '';
      // }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe;
    }
  }

  close() {
    this.text = '';
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end'  ? 'start' : 'end';
  }
}
