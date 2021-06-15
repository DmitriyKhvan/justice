import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public mainService: MainService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mainService.ROLE = this.authService.userRole;
  }
}
