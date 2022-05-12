import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-stop-process-mfo',
  templateUrl: './stop-process-mfo.component.html',
  styleUrls: ['./stop-process-mfo.component.scss'],
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
export class StopProcessMfoComponent implements OnInit {
  regionList: Array<any> = [];

  branchList: any = [];
  regListItemIdx = null;

  constructor(
    public clientsService: ClientsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientsService.getMfo(5).subscribe((resp) => {
      this.regionList = resp.data;
    });
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
    this.router.navigate(['admin/stopProcessList'], { queryParams: { mfo } });
  }

  // getCountOfList(mfo: any): any {
  //   return this.clientsService.getListByMfo(mfo).subscribe();
  // }
}
