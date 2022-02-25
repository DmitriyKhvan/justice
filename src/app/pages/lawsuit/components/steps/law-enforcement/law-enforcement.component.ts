import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-law-enforcement',
  templateUrl: './law-enforcement.component.html',
  styleUrls: ['./law-enforcement.component.scss'],
})
export class LawEnforcementComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
