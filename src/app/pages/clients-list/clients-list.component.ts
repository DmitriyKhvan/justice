import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { KeycloakService } from 'keycloak-angular';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { fromEvent, Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';

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
export class ClientsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('sorting') sortingRef!: QueryList<ElementRef>;
  @ViewChild('search', { static: true }) inputRef!: ElementRef;

  range: any = [];

  selectedItem = null;

  currentPage: number = sessionStorage.getItem('currentPage')
    ? Number(sessionStorage.getItem('currentPage'))
    : 1;
  totalItems!: number;
  pages: Array<any> = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 'all', value: -1 },
  ];

  itemsPerPage: number = sessionStorage.getItem('itemsPerPage')
    ? Number(sessionStorage.getItem('itemsPerPage'))
    : this.pages[0].value;
  sortValue: string = '';
  sortType: string = '';
  searchValue: string = '';
  sortClass: string = 'uil-angle-down';

  contractList!: any;

  timerId!: any;

  searchSub!: Subscription;
  contractsSub!: Subscription;
  mSub!: Subscription;
  upSub!: Subscription;
  tSub!: Subscription;

  filialName: string = '';
  currentDate: Date = new Date();

  loader = true;

  constructor(
    public clientsService: ClientsService,
    private router: Router,
    public route: ActivatedRoute,
    public keycloak: KeycloakService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((val) => {
    //   this.clientsService.getListByMfo(val.mfo).subscribe((value) => {
    //     this.clientsService.listByMfo.next(value);
    //   });
    // });

    // this.route.params
    //   .pipe(
    //     switchMap(() => {
    //       const data = {
    //         page: this.currentPage,
    //         count: this.itemsPerPage,
    //         mfo: this.route.snapshot.queryParams['mfo'],
    //       };

    //       return this.clientsService.getListByMfo(data);
    //     })
    //   )
    //   .subscribe((value) => {
    //     console.log(value);

    //     this.contractList = value.contracts;
    //     this.totalItems = value.count;
    //   });

    // this.mSub = this.clientsService
    //   .getMfo()
    //   .pipe(map((data: any) => data.data))
    //   .subscribe((data) => {
    //     this.filialName = data
    //       .map((filials: any) => filials.branches)
    //       .flat()
    //       .find(
    //         (mfo: any) => mfo.mfo === this.route.snapshot.queryParams['mfo']
    //       )?.nameRu;
    //   });

    this.getContracts();

    this.upSub = this.popUpInfoService.updateContractList$.subscribe(() => {
      this.getContracts();
    });

    this.searchSub = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target.value.toLowerCase()),
        // filter((value) => value.length > 2),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.currentPage = 1;

        this.searchValue = value;
        this.getContracts();
      });

    // this.tSub = this.lawsuitService.translate
    //   .get(['all'])
    //   .subscribe((translate) => this.setValidationValue(translate));

    // this.tSub = this.lawsuitService.translate.onLangChange
    //   .pipe(
    //     tap(() => console.log(789)),
    //     mergeMap(() => {
    //       return this.lawsuitService.translate.get(['all']);
    //     })
    //   )
    //   .subscribe((translate: any) => this.setValidationValue(translate));
  }

  ngAfterViewInit(): void {}

  setValidationValue(translate: any) {
    this.pages = [
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 30, value: 30 },
      { label: translate.all, value: -1 },
    ];
  }

  sort(sortValue: string, event: any) {
    if (event.target.classList.contains('uil-angle-down')) {
      this.resetSortClass();

      event.target.className = 'uil-angle-up sorting';
      console.log(sortValue);

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
    this.selectedItem = null;
    this.currentPage = currentPage;

    sessionStorage.setItem('currentPage', this.currentPage.toString());
    sessionStorage.setItem('itemsPerPage', this.itemsPerPage.toString());

    this.currentPage = sessionStorage.getItem('currentPage')
      ? Number(sessionStorage.getItem('currentPage'))
      : currentPage;
    this.itemsPerPage = sessionStorage.getItem('itemsPerPage')
      ? Number(sessionStorage.getItem('itemsPerPage'))
      : this.itemsPerPage;

    this.getContracts();
  }

  getContracts() {
    this.loader = true;
    const data = {
      page: this.currentPage,
      count: this.itemsPerPage,

      mfo: this.route.snapshot.queryParams['mfo'],
      sortValue: this.sortValue,
      sortType: this.sortType,
      search: this.searchValue,
    };

    this.contractsSub = this.clientsService.getListByMfo(data).subscribe(
      (contracts: any) => {
        this.contractList = contracts.contracts;
        this.totalItems = contracts.count;
        this.filialName = contracts.branchName.nameRus;

        this.loader = false;
      },
      () => {
        this.loader = false;
      }
    );
  }

  selectItem(pld: any, idx: any): void {
    this.selectedItem = idx;

    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        contractId: pld.contractId,
        stepId: pld.lastStepId,
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

  // showListDecision(): void {
  //   // this.selectDecisions();
  //   // this.lawsuitService.timerIdDecisions = setInterval(() => {
  //   //   this.selectDecisions();
  //   // }, 5000);

  //   this.popUpInfoService.popUpListDecision('open', {});
  // }

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
    this.upSub?.unsubscribe();
    this.mSub?.unsubscribe();
    this.tSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}
