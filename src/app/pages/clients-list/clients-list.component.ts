import { Component, DoCheck, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { ClientsService } from '../../services/clients.service';

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

  contractList = [
    {
      id: 0,
      client_id: 0,
      client_inn: '',
      client_name: '',
      client_type: '',
      client_phone: '',
      client_address: '',
      client_mfo: '',
      contract_id: 0,
      contract_date: '',
      credit_summ: '',
      credit_currency_code: 0,
      credit_start_date: '',
      credit_end_date: '',
      guarantor_name: '',
      guarantor_inn: '',
      interest_rate: '',
      status_upbuilding: 0,
      remainder_debt: '',
      remainder_overdue_debt: '',
      remainder_accrued_percent: '',
      remainder_accrued_percent_overdue_debt: '',
      pledge: '',
      total_debt: '',
      delay_date: '',
    },
  ];

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      console.log('val', val);

      this.clientsService.getListByMfo(val.mfo).subscribe((value) => {
        this.clientsService.listByMfo.next(value);
      });
    });
  }

  ngDoCheck(): void {
    this.clientsService.listByMfo.subscribe((value) => {
      this.contractList = value;
    });
  }

  selectItem(pld: any, idx: any): void {
    this.selectedItem = idx;

    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        contract: pld.contract_id,
      },
    });
  }

  get stateName(): any {
    return this.selectedItem !== null ? 'show' : 'hide';
  }

  showDetails(): void {
    this.route.queryParams.subscribe((val) => {
      this.clientsService.contractDetails(val.contract).subscribe((value) => {
        this.router.navigate(['clients/lawsuit'], {
          queryParams: {
            ...this.route.snapshot.queryParams,
            step: value.current_task.task_step,
          },
        });
      });
    });
    // this.router.navigate(['clients/detail'], {
    //   queryParams: { ...this.route.snapshot.queryParams },
    // });
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
