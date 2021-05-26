import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, Subscription } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-is-active-user',
  templateUrl: './is-active-user.component.html',
  styleUrls: ['./is-active-user.component.scss'],
})
export class IsActiveUserComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(public auth: AuthService, private ngZone: NgZone) {}

  inactivityTime() {
    const events = ['keyup', 'mousemove', 'wheel'];

    this.subscription = from(events)
      .pipe(
        // tap((x) => console.log('beforeMp')),
        mergeMap((event) => fromEvent(document, event)),
        // tap((x) => console.log('afterMap', x)),
        debounceTime(1000)
        // tap((x) => console.log('afterDebounce'))
      )
      .subscribe(() => this.auth.startTimerLogout());
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.ngZone.runOutsideAngular(() => {
        this.inactivityTime();
      });
    }
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.subscription.unsubscribe();
  }
}
