import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
  }

  showNotifications(): void {
    this.mainService.sidebar = true;
  }
}
