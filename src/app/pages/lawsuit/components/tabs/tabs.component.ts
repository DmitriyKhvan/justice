import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  // @ViewChildren('stepRef') stepsRef!: QueryList<ElementRef>;

  // stepsProcessParams = {
  //   contractId: 3,
  //   mfo: '00450',
  //   lang: 'ru',
  // };

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
