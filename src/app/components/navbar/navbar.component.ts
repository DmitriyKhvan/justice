import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  profile!: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    public mainService: MainService,
    public keycloak: KeycloakService,
    private alert: AlertService
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
  }

  showNotifications(): void {
    this.mainService.sidebar = true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
