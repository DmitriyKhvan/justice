import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from './services/main.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { LawsuitService } from './services/lawsuit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'justice-front';
  tSub!: Subscription;

  constructor(
    public mainService: MainService,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private lawsuitService: LawsuitService
  ) {
    const currentLang: any = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'ru';

    this.lawsuitService.translate.use(currentLang);
    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     // console.log(events);
    //     this.mainService.previousUrl.subscribe();
    //     this.mainService.previousUrl.next(events[0].state);
    //
    //     // this.mainService.currentUrl.subscribe();
    //     // this.mainService.currentUrl.next(events[1].urlAfterRedirects);
    //   });
  }

  ngOnInit(): void {}
}
