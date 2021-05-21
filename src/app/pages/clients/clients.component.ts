import { Component, DoCheck, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { ClientsService } from '../../services/clients.service';
import {environment} from '../../../environments/environment';

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
  mainList = [
    {
      region_name: 'Андижанское отделение',
      region_code: '001',
      region_client_total: '3329',
      branch_offices: [
        {
          mfo: '00903',
          branch_name: 'Избасканский филиал',
          // branch_code: string | number,
          branch_client_total: '630',
        },
        {
          mfo: '00903',
          branch_name: 'Андижанское отделение',
          // branch_code: string | number,
          branch_client_total: '1644',
        },
        {
          mfo: '00903',
          branch_name: 'Асакинский филиал',
          // branch_code: string | number,
          branch_client_total: '1644',
        },
      ],
    },
    {
      region_name: 'Бухарское отделение',
      region_code: '002',
      region_client_total: '1301',
      branch_offices: [
        {
          mfo: '00903',
          branch_name: 'Кургонтепинский филиал',
          // branch_code: string | number,
          branch_client_total: '126',
        },
        {
          mfo: '00903',
          branch_name: 'Шахриханский филиал',
          // branch_code: string | number,
          branch_client_total: '245',
        },
        {
          mfo: '00903',
          branch_name: 'Мархаматский филиал',
          // branch_code: string | number,
          branch_client_total: '315',
        },
      ],
    },
    {
      region_name: 'ГУ по г. Ташкенту',
      region_code: '003',
      region_client_total: '1301',
      branch_offices: [
        {
          mfo: '00903',
          branch_name: 'Пахтаабадский филиал',
          // branch_code: string | number,
          branch_client_total: '1326',
        },
      ],
    },
    {
      region_name: 'Джизакское отделение',
      region_code: '004',
      region_client_total: '0',
      branch_offices: [],
    },
    {
      region_name: 'Каракалпакское отделение',
      region_code: '005',
      region_client_total: '0',
      branch_offices: [],
    },
  ];

  regionList: Array<any> = [];

  branchList: any = [];
  regListItemIdx = null;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainService.getMfo().subscribe((resp) => {
      this.regionList = resp.data;
    });
  }

  ngDoCheck(): void {
    if (this.route.snapshot.queryParams.region) {
      this.branchList = this.regionList?.find(
        (el) => String(el.region_id) === this.route.snapshot.queryParams.region
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
