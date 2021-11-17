import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.scss'],
})
export class NotaryComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
