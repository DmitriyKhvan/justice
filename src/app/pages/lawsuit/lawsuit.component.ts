import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, OnDestroy {
  requestTimeout: any = null;
  resize: boolean = true;

  upSub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public keycloak: KeycloakService,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe
      // switchMap(() => {
      //   this.lawsuitService.actions = [];
      //   this.lawsuitService.historyActions = [];
      //   this.lawsuitService.historySteps = [];
      //   this.lawsuitService.steps = [];

      //   this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
      //   this.lawsuitService.contractId = this.route.snapshot.queryParams[
      //     'contractId'
      //   ];
      //   return this.lawsuitService.getStepsProcess(
      //     this.route.snapshot.queryParams
      //   );
      // }),
      // tap((steps) => {
      //   this.lawsuitService.steps = steps;
      //   this.lawsuitService.getCurrentStep(
      //     this.route.snapshot.queryParams['stepId']
      //       ? this.route.snapshot.queryParams['stepId']
      //       : steps[steps.length - 1].stepid
      //   );
      // }),
      // switchMap(() => {
      //   return this.lawsuitService.getStepActions({
      //     mfo: this.route.snapshot.queryParams['mfo'],
      //     contractId: this.route.snapshot.queryParams['contractId'],
      //     stepId: this.route.snapshot.queryParams['stepId'],
      //   });
      // }),
      // tap((histories) => {
      //   // console.log('histories', histories);
      //   // this.lawsuitService.actions = [];
      //   this.lawsuitService.historyActions = histories.actions.filter(
      //     (action: any) =>
      //       // action.actionStatus !== 0 && action.actionStatus !== 4
      //       action.actionStatus !== 0
      //   );
      //   this.lawsuitService.actionStart = histories.actions.find(
      //     (action: any) => action.data === null
      //   );
      //   // console.log(
      //   //   'this.lawsuitService.actionStart',
      //   //   this.lawsuitService.actionStart
      //   // );
      //   if (this.lawsuitService.actionStart) {
      //     this.lawsuitService.actions.push(
      //       // this.lawsuitService.actionStart.actionId
      //       this.lawsuitService.actionStart
      //     );
      //   }
      //   this.lawsuitService.historySteps = histories.jumps;
      //   this.lawsuitService.isDeniedStep = this.lawsuitService.historySteps.some(
      //     (step) => step.status === 1
      //   );
      // })
      ()
      .subscribe(() => this.startProcess());

    this.upSub = this.popUpInfoService.updateContractList$
      .pipe(
        tap(() => this.startProcess()),
        mergeMap(() => {
          return this.lawsuitService.getContractInfo(
            this.route.snapshot.queryParams['contractId']
          );
        })
      )
      .subscribe((contract) => {
        this.lawsuitService.contract = contract;
      });
  }

  startProcess() {
    this.lawsuitService.actions = [];
    this.lawsuitService.historyActions = [];
    this.lawsuitService.historySteps = [];
    this.lawsuitService.steps = [];

    this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
    this.lawsuitService.contractId = this.route.snapshot.queryParams[
      'contractId'
    ];
    this.lawsuitService
      .getStepsProcess(this.route.snapshot.queryParams)
      .pipe(
        tap((steps) => {
          this.lawsuitService.steps = steps;
          this.lawsuitService.getCurrentStep(
            this.route.snapshot.queryParams['stepId']
              ? this.route.snapshot.queryParams['stepId']
              : steps[steps.length - 1].stepid
          );
        }),
        switchMap(() => {
          return this.lawsuitService.getStepActions({
            mfo: this.route.snapshot.queryParams['mfo'],
            contractId: this.route.snapshot.queryParams['contractId'],
            stepId: this.route.snapshot.queryParams['stepId'],
          });
        }),
        tap((histories) => {
          // console.log('histories', histories);
          // this.lawsuitService.actions = [];
          this.lawsuitService.historyActions = histories.actions.filter(
            (action: any) =>
              // action.actionStatus !== 0 && action.actionStatus !== 4
              action.actionStatus !== 0
          );
          this.lawsuitService.actionStart = histories.actions.find(
            (action: any) => action.data === null
          );
          // console.log(
          //   'this.lawsuitService.actionStart',
          //   this.lawsuitService.actionStart
          // );
          if (this.lawsuitService.actionStart) {
            this.lawsuitService.actions.push(
              // this.lawsuitService.actionStart.actionId
              this.lawsuitService.actionStart
            );
          }
          this.lawsuitService.historySteps = histories.jumps;
          this.lawsuitService.isDeniedStep = this.lawsuitService.historySteps.some(
            (step) => step.status === 1
          );
        })
      )
      .subscribe();
  }

  onAdd(value: any) {
    this.resize = value;
  }

  goToBack(): void {
    this.router.navigate(['clients/list'], {
      queryParams: { mfo: this.route.snapshot.queryParams.mfo },
    });
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }

  ngOnDestroy(): void {
    this.upSub?.unsubscribe();
    // if (this.requestTimeout) {
    //   clearTimeout(this.requestTimeout);
    // }
  }
}
