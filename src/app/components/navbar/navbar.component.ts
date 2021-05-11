import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, public mainService: MainService) {}

  ngOnInit(): void {}

  showNotifications(): void {
    this.mainService.sidebar = true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
