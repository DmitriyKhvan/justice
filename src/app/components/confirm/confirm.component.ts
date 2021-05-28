import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { bounce } from 'ng-animate';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/shared/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [
    trigger('wrapAlert', [transition('* => *', useAnimation(bounce))]),
  ],
})
export class ConfirmComponent implements OnInit, OnDestroy {
  public text!: string;
  public id!: number;
  public method!: any;
  wrapAlertState = 'end';

  cSub!: Subscription;
  dSub!: Subscription;

  constructor(
    private confirmService: ConfirmService,
    private adminService: AdminService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.cSub = this.confirmService.confirm$.subscribe((confirm) => {
      this.text = confirm.text;
      this.id = confirm.id;
      this.method = confirm.method;
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe;
    }

    if (this.dSub) {
      this.dSub.unsubscribe;
    }
  }

  removeUser() {
    this.close();
    this.method(this.id);
  }

  close() {
    this.text = '';
  }

  animationAlert() {
    this.wrapAlertState = this.wrapAlertState === 'end' ? 'start' : 'end';
  }
}
