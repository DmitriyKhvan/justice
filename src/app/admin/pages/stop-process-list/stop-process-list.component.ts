import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { forkJoin, fromEvent, Subscription } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { MainService } from 'src/app/services/main.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-stop-process-list',
  templateUrl: './stop-process-list.component.html',
  styleUrls: ['./stop-process-list.component.scss'],
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
export class StopProcessListComponent implements OnInit, OnDestroy {
  @ViewChildren('sorting') sortingRef!: QueryList<ElementRef>;
  range: any = [];

  selectedItem = null;

  currentPage: number = 1;
  totalItems!: number;
  pages: Array<any> = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 'Все', value: -1 },
  ];
  itemsPerPage: number = this.pages[0].value;
  sortValue: string = '';
  sortType: string = 'ASC';
  sortClass: string = 'uil-angle-down';

  contractList!: any;

  timerId!: any;

  contractsSub!: Subscription;
  mSub!: Subscription;
  upSub!: Subscription;

  filialName!: string;
  currentDate: Date = new Date();

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private dicService: DictionariesService,
    private router: Router,
    public route: ActivatedRoute,
    public keycloak: KeycloakService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.mSub = this.clientsService
      .getMfo()
      .pipe(map((data: any) => data.data))
      .subscribe((data) => {
        this.filialName = data
          .map((filials: any) => filials.branches)
          .flat()
          .find(
            (mfo: any) => mfo.mfo === this.route.snapshot.queryParams['mfo']
          )?.nameRu;
      });

    this.getContracts();

    this.upSub = this.popUpInfoService.updateContractList$.subscribe(() => {
      this.selectedItem = null;
      this.getContracts();
    });
  }

  sort(sortValue: string, event: any) {
    if (event.target.classList.contains('uil-angle-down')) {
      this.resetSortClass();

      event.target.className = 'uil-angle-up sorting';
      this.sortValue = sortValue;
      this.sortType = 'ASC';
    } else {
      this.resetSortClass();

      event.target.className = 'uil-angle-down sorting';
      this.sortValue = sortValue;
      this.sortType = 'DESC';
    }

    this.getContracts();
  }

  resetSortClass() {
    this.sortingRef.forEach((el: any) => {
      el.nativeElement.className = 'uil-angle-down sorting';
    });
  }

  pageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.getContracts();
  }

  getContracts() {
    const data = {
      page: this.currentPage,
      count: this.itemsPerPage,
      mfo: this.route.snapshot.queryParams['mfo'],
      sortValue: this.sortValue,
      sortType: this.sortType,
    };

    this.contractsSub = this.clientsService
      .getListStopProcess(data)
      .subscribe((contracts: any) => {
        this.contractList = contracts.contracts;
        this.totalItems = contracts.count;
      });
  }

  selectItem(contract: any, idx: any): void {
    this.selectedItem = idx;

    this.popUpInfoService.popUpStopProcessDecision('open', contract);

    // this.router.navigate([], {
    //   queryParams: {
    //     ...this.route.snapshot.queryParams,
    //     contractId: constract.contractId,
    //     stepId: constract.lastStepId,
    //   },
    // });
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
    this.selectDecisions();
    // this.lawsuitService.timerIdDecisions = setInterval(() => {
    //   this.selectDecisions();
    // }, 5000);

    this.popUpInfoService.popUpListDecision('open', {});
  }

  selectDecisions() {
    this.route.params
      .pipe(
        // tap(() => console.log('888', this.route.snapshot.queryParams)),
        switchMap((params: Params) => {
          // console.log(
          //   'this.route.snapshot.queryParams',
          //   this.route.snapshot.queryParams
          // );

          return this.lawsuitService.getPending(
            this.route.snapshot.queryParams
          );
        })
      )
      .subscribe((decisions) => {
        const resArr = { ...this.lawsuitService.decisions, ...decisions };

        resArr.actions = resArr.actions.filter(
          (v: any, i: any, a: any) =>
            a.findIndex((t: any) => JSON.stringify(t) === JSON.stringify(v)) ===
            i
        );

        this.lawsuitService.decisions = resArr;
      });
  }

  ngOnDestroy(): void {
    this.contractsSub?.unsubscribe();
    this.mSub?.unsubscribe();
    this.upSub?.unsubscribe();
  }
}
