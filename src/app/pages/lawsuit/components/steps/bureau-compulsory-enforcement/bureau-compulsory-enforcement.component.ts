import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-bureau-compulsory-enforcement',
  templateUrl: './bureau-compulsory-enforcement.component.html',
  styleUrls: ['./bureau-compulsory-enforcement.component.scss'],
})
export class BureauCompulsoryEnforcementComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
