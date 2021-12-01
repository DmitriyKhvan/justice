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
      clientId: 0,
      clientInn: '',
      clientName: '',
      clientType: '',
      clientPhone: '',
      clientAddress: '',
      clientMfo: '',
      contractId: 0,
      contractDate: '',
      creditSumm: '',
      creditCurrencyCode: 0,
      creditStartDate: '',
      creditEndDate: '',
      guarantorName: '',
      guarantorInn: '',
      interestRate: '',
      statuUpbuilding: 0,
      remainderDebt: '',
      remainderOverdueDebt: '',
      remainderAccruedPercent: '',
      remainderAccruedPercentOverdueDebt: '',
      pledge: '',
      totalDebt: '',
      delayDate: '',
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
        contractId: pld.contractId,
      },
    });
  }

  get stateName(): any {
    return this.selectedItem !== null ? 'show' : 'hide';
  }

  showDetails(): void {
    // this.route.queryParams.subscribe((val) => {
    //   this.clientsService.contractDetails(val.contract).subscribe((value) => {
    //     this.router.navigate(['clients/lawsuit'], {
    //       queryParams: {
    //         ...this.route.snapshot.queryParams,
    //         step: value.current_task.task_step,
    //       },
    //     });
    //   });
    // });
    this.router.navigate(['clients/lawsuit'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
