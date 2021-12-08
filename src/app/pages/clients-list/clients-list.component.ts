import { Component, DoCheck, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { ClientsService } from '../../services/clients.service';
import { KeycloakService } from 'keycloak-angular';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';
import { switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

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
      clientFio: '',
      clientType: '',
      clientPhone: '',
      clientAddress: '',
      clientMfo: '',
      contractId: 0,
      contractDate: '',
      creditSumm: '',
      creditCurrency: 0,
      creditStart: '',
      creditEnd: '',
      guarantorName: '',
      guarantorInn: '',
      interestRate: '',
      statuUpbuilding: 0,
      remainderCurrentDebt: '',
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
    public route: ActivatedRoute,
    public keycloak: KeycloakService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
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

  showListDecision(): void {
    this.route.params
      .pipe(
        tap(() => console.log('888', this.route.snapshot.queryParams)),
        switchMap((params: Params) => {
          console.log(
            'this.route.snapshot.queryParams',
            this.route.snapshot.queryParams
          );

          return this.lawsuitService.getPending(
            this.route.snapshot.queryParams
          );
        })
      )
      .subscribe((decisions) => {
        console.log(decisions);

        this.lawsuitService.decisions = decisions;
      });

    this.popUpInfoService.popUpListDecision('open', {});
  }
}
