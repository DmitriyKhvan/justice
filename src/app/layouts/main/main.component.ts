import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    // private auth: AuthService,
    private keycloak: KeycloakService,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    // this.mainService.ROLE = this.keycloak.getUserRoles();
  }
}
