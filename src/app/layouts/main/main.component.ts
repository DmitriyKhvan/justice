import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  time: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.inactivityTime();
    }
  }

  inactivityTime() {
    // this.resetTimer();
    //this.auth.startTimerLogout(1000 * 10);
    this.subscription = fromEvent(document, 'mousemove').subscribe((e) => {
      console.log(e);
      // this.resetTimer();
      this.auth.startTimerLogout();
    });
  }

  // resetTimer() {
  //   clearTimeout(this.time);
  //   this.time = setTimeout(this.alertUser.bind(this), 1000 * 10);
  // }

  alertUser() {
    this.subscription.unsubscribe();
    alert('User is inactive');
  }

  ngOnDestroy(): void {
    console.log('destroy');

    this.subscription.unsubscribe();
  }
}
