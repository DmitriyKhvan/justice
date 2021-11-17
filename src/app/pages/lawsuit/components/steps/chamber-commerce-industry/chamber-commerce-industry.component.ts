import { Component, OnInit } from '@angular/core';

import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-chamber-commerce-industry',
  templateUrl: './chamber-commerce-industry.component.html',
  styleUrls: ['./chamber-commerce-industry.component.scss'],
})
export class ChamberCommerceIndustryComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
