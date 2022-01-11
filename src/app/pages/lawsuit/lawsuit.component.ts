import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, OnDestroy {
  requestTimeout: any = null;
  resize: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(() => {
          this.lawsuitService.actions = [];
          this.lawsuitService.historyActions = [];
          this.lawsuitService.historySteps = [];
          this.lawsuitService.steps = [];

          this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
          this.lawsuitService.contractId = this.route.snapshot.queryParams[
            'contractId'
          ];
          return this.lawsuitService.getStepsProcess(
            this.route.snapshot.queryParams
          );
        }),
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

    // this.route.queryParams
    //   .pipe(
    //     switchMap(() => {
    //       this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
    //       this.lawsuitService.contractId = this.route.snapshot.queryParams[
    //         'contractId'
    //       ];
    //       return this.lawsuitService.getStepsProcess(
    //         this.route.snapshot.queryParams
    //       );
    //     })
    //   )
    //   .subscribe((steps) => {
    //     this.lawsuitService.steps = steps;
    //     this.lawsuitService.getCurrentStep(
    //       this.route.snapshot.queryParams['stepId']
    //         ? this.route.snapshot.queryParams['stepId']
    //         : steps[steps.length - 1].stepid
    //     );
    //   });

    // this.route.params
    //   .pipe(
    //     switchMap(() => {
    //       // this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
    //       //   'stepId'
    //       // ];
    //       this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
    //       this.lawsuitService.contractId = this.route.snapshot.queryParams[
    //         'contractId'
    //       ];
    //       return this.lawsuitService.getStepsProcess(
    //         this.route.snapshot.queryParams
    //       );
    //     })
    //   )
    //   .subscribe((steps) => {
    //     this.lawsuitService.steps = steps;
    //     this.lawsuitService.getCurrentStep(
    //       this.route.snapshot.queryParams['stepId']
    //         ? this.route.snapshot.queryParams['stepId']
    //         : steps[steps.length - 1].stepid
    //     );
    //   });
    // // this.refreshObject();
  }

  // refreshObject() {
  //   console.log('Бекзод');

  //   this.route.params
  //     .pipe(
  //       switchMap(() => {
  //         // this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
  //         //   'stepId'
  //         // ];
  //         this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
  //         this.lawsuitService.contractId = this.route.snapshot.queryParams[
  //           'contractId'
  //         ];
  //         return this.lawsuitService.getStepsProcess(
  //           this.route.snapshot.queryParams
  //         );
  //       })
  //     )
  //     .subscribe((steps) => {
  //       this.lawsuitService.steps = steps;

  //       this.lawsuitService.getCurrentStep(
  //         this.route.snapshot.queryParams['stepId']
  //           ? this.route.snapshot.queryParams['stepId']
  //           : steps[steps.length - 1].stepid
  //       );

  //       this.requestTimeout = setTimeout(() => this.refreshObject(), 1000);
  //     });
  // }

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
    // if (this.requestTimeout) {
    //   clearTimeout(this.requestTimeout);
    // }
  }
}
