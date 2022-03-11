import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-stop-process-wrap',
  templateUrl: './stop-process-wrap.component.html',
  styleUrls: ['./stop-process-wrap.component.scss'],
})
export class StopProcessWrapComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
