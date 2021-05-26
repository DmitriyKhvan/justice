import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, DoCheck {
  constructor(public route: ActivatedRoute, public auth: AuthService) {}

  ngOnInit(): void {}
  ngDoCheck() {
    console.log('update!!!');
  }
}
