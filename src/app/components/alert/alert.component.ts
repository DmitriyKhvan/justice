import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { bounce, tada } from 'ng-animate';
import { Subscription } from 'rxjs';
import { LoginPass } from 'src/app/interfaces';
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
  public loginPass!: LoginPass | null;
  wrapAlertState = 'end';

  aSub!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;
      this.loginPass = alert.loginPass;
      console.log('loginPas', alert.loginPass);

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
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }
}
