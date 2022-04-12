import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-make-decesions',
  templateUrl: './make-decesions.component.html',
  styleUrls: ['./make-decesions.component.scss'],
})
export class MakeDecesionsComponent implements OnInit {
  constructor(
    private popUpInfoService: PopUpInfoService,
    public keycloak: KeycloakService
  ) {}

  ngOnInit(): void {}

  showListDecision(): void {
    this.popUpInfoService.popUpListDecision('open', {});
  }
}
