import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stop-process-message',
  templateUrl: './stop-process-message.component.html',
  styleUrls: ['./stop-process-message.component.scss'],
})
export class StopProcessMessageComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
