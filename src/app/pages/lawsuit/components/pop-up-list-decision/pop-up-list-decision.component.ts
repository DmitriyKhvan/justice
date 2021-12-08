import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-pop-up-list-decision',
  templateUrl: './pop-up-list-decision.component.html',
  styleUrls: ['./pop-up-list-decision.component.scss'],
})
export class PopUpListDecisionComponent implements OnInit, OnDestroy {
  @ViewChild('wrapPopUpRight', { static: true }) wrapPopUpRight!: ElementRef;

  isActive!: string;
  listDecision = {};
  popUpInfoSub!: Subscription;
  closePopUpInfoSub!: Subscription;

  form!: FormGroup;
  submitted = false;

  // decisions!: any;

  options = [
    { label: 'Отказать', value: 1 },
    { label: 'Одобрить', value: 3 },
  ];

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.queryParams
    //   .pipe(tap((val) => console.log('66', val)))
    //   .subscribe();

    // this.route.params
    //   .pipe(
    //     tap(() => console.log('888', this.route.snapshot.queryParams)),
    //     switchMap((params: Params) => {
    //       console.log(
    //         'this.route.snapshot.queryParams',
    //         this.route.snapshot.queryParams
    //       );

    //       return this.lawsuitService.getPending(
    //         this.route.snapshot.queryParams
    //       );
    //     })
    //   )
    //   .subscribe((decisions) => {
    //     console.log(decisions);

    //     this.decisions = decisions;
    //   });

    this.popUpInfoSub = this.popUpInfoService.popUpListDecision$.subscribe(
      (popUpData: any) => {
        console.log('popUpData', popUpData);

        this.isActive = popUpData.isActive;
        this.listDecision = popUpData.listDecision;
      }
    );

    this.closePopUpInfoSub = fromEvent(
      this.wrapPopUpRight.nativeElement,
      'click'
    )
      .pipe(
        map((event: any) => event.target),
        tap((event: any) => {
          if (event.dataset.close) {
            this.popUpInfoService.popUpListDecision('close');
          }
        })
      )
      .subscribe();

    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(''),
    });
  }

  toggleDecision(event: any) {
    event.target.closest('.decision_value').classList.toggle('active');
  }

  submit(processId: number | null = null) {
    console.log('processId', processId);

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      processId,
      status: this.form.value.decision,
      headLawyerInfo: this.form.value.additionalInfo,
    };

    this.lawsuitService.confirmAction(data).subscribe(
      (actions) => {
        // this.lawsuitService.historyActions = actions;
        this.submitted = false;
        this.alert.success('Форма оформлена');
      },
      (error) => {
        this.submitted = false;
        this.alert.danger('Форма не оформлена');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.popUpInfoSub) {
      this.popUpInfoSub.unsubscribe();
    }
  }
}
