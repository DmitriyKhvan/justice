import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  constructor(
    public lawsuitService: LawsuitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
