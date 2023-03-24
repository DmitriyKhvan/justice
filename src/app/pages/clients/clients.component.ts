import { Component, DoCheck, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [
    trigger('showBranches', [
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
export class ClientsComponent implements OnInit, DoCheck {
  regionList: Array<any> = [];

  branchList: any = [];
  regListItemIdx = null;
  loader = true;

  constructor(
    public clientsService: ClientsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientsService.getMfo().subscribe(
      (resp) => {
        this.regionList = resp.data;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }

  ngDoCheck(): void {
    if (this.route.snapshot.queryParams.region) {
      this.branchList = this.regionList?.find(
        (el) => String(el.regionId) === this.route.snapshot.queryParams.region
      )?.branches;
    } else {
      this.branchList = [];
    }
  }

  get stateName(): any {
    return this.branchList?.length ? 'show' : 'hide';
  }

  getBranchList(pld: any, idx: any): void {
    this.router.navigate([], { queryParams: { region: pld } });

    // this.regListItemIdx = this.branchList.length ? idx : null;
  }

  getList(mfo: any): void {
    this.router.navigate(['clients/list'], { queryParams: { mfo } });
  }

  // getCountOfList(mfo: any): any {
  //   return this.clientsService.getListByMfo(mfo).subscribe();
  // }
}
