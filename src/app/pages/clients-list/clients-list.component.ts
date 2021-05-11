import {Component, DoCheck, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  animations: [
    trigger('showAction', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class ClientsListComponent implements OnInit, DoCheck {
  range: any = [];

  selectedItem = null;

  constructor(public mainService: MainService, private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    for (let i = 0; i < 99; i++) {
      this.range.push(i);
    }

  }

  ngDoCheck(): void {
  }

  selectItem(pld: any, idx: any): void {
    this.selectedItem = idx;

    this.router.navigate([], {queryParams: {...this.route.snapshot.queryParams, contract: pld}});
  }

  get stateName(): any {
    return this.selectedItem !== null ? 'show' : 'hide';
  }

  showDetails(): void {
    this.router.navigate(['clients/detail'], {queryParams: {...this.route.snapshot.queryParams, step: 1}});
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {queryParams: {...this.route.snapshot.queryParams}});
  }
}
