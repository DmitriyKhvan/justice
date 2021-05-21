import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, Subscription } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
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
    const events = ['keyup', 'mousemove', 'wheel'];

    this.subscription = from(events)
      .pipe(
        mergeMap((event) => fromEvent(document, event)),
        debounceTime(1000)
      )
      .subscribe(() => this.auth.startTimerLogout());
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.subscription.unsubscribe();
  }
}
