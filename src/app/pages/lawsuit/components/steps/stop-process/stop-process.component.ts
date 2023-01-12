import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stop-process',
  templateUrl: './stop-process.component.html',
  styleUrls: ['./stop-process.component.scss'],
})
export class StopProcessComponent implements OnInit {
  action!: any;

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {
    // this.action = this.lawsuitService.stopProcessStep?.actions.find(
    //   (action: any) => action.id === 24
    // );
  }
}
