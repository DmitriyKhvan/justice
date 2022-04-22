import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { MainService } from '../../services/main.service';

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
    public mainService: MainService,
    public keycloak: KeycloakService,
    private alert: AlertService,
    // public translate: TranslateService,
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
        this.alert.danger(error.error.message);
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

  useLanguage(language: string): void {
    this.lawsuitService.translate.use(language);
  }

  showNotifications(): void {
    this.mainService.sidebar = true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.tSub?.unsubscribe();
  }
}
