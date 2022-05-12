import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private lawsuitService: LawsuitService
  ) {
    const currentLang: any = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'ru';

    this.lawsuitService.translate.use(currentLang);
  }

  ngOnInit(): void {}
}
