import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
