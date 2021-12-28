import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, OnDestroy {
  requestTimeout: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(() => {
          // this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
          //   'stepId'
          // ];
          this.lawsuitService.mfo = this.route.snapshot.queryParams['mfo'];
          this.lawsuitService.contractId = this.route.snapshot.queryParams[
            'contractId'
          ];
          return this.lawsuitService.getStepsProcess(
            this.route.snapshot.queryParams
          );
        })
      )
      .subscribe((steps) => {
        this.lawsuitService.steps = steps;
        this.lawsuitService.getCurrentStep(
          this.route.snapshot.queryParams['stepId']
            ? this.route.snapshot.queryParams['stepId']
            : steps[steps.length - 1].stepid
        );
      });

    // this.route.params
    //   .pipe(
    //     tap(() => console.log(999)),
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
    // this.refreshObject();
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
