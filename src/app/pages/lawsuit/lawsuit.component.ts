import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-lawsuit',
  templateUrl: './lawsuit.component.html',
  styleUrls: ['./lawsuit.component.scss'],
})
export class LawsuitComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngAfterViewInit(): void {
    // console.log(this.lawsuitService.fromStepId);
    // if (this.lawsuitService.fromStepId) {
    //   this.lawsuitService.getCurrentStep(this.lawsuitService.fromStepId);
    // }
  }

  ngOnInit(): void {
    console.log(11111111111);

    this.route.params
      .pipe(
        switchMap(() => {
          this.lawsuitService.fromStepId = this.route.snapshot.queryParams[
            'stepId'
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
}
