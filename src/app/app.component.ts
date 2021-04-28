import {Component, DoCheck, OnInit} from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {MainService} from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'justice-front';

  constructor(public mainService: MainService, private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        // console.log(events);
        this.mainService.previousUrl.subscribe();
        this.mainService.previousUrl.next(events[0].state);

        // this.mainService.currentUrl.subscribe();
        // this.mainService.currentUrl.next(events[1].urlAfterRedirects);
      });
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
