import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';
import { Print } from 'universal-print-js-ts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  profile!: any;
  tSub!: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public keycloak: KeycloakService,
    private alert: AlertService,
    // public translate: TranslateService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.keycloak
      .loadUserProfile()
      .then((profile) => {
        // alert(JSON.stringify(profile, null, '  '));
        this.profile = profile;
      })
      .catch((error) => {
        this.alert.danger(
          !error.error.message || error.statusText === 'Unknown Error'
            ? this.lawsuitService.translate.instant('serverError')
            : error.message
        );
        // alert('Failed to load user profile');
      });

    // console.log('getDefaultLang', this.translate.getDefaultLang());

    this.tSub = this.lawsuitService.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.lawsuitService.translate.use(event.lang);
        localStorage.setItem('lang', event.lang);
      }
    );
  }

  print() {
    Print('problem_credit');
  }

  useLanguage(language: string): void {
    this.lawsuitService.translate.use(language);
  }

  showNotifications(): void {
    this.popUpInfoService.popUpListNotification('open', {});
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.tSub?.unsubscribe();
  }
}
