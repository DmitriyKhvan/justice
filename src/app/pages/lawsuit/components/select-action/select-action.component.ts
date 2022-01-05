import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { LawsuitComponent } from '../../lawsuit.component';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss'],
})
export class SelectActionComponent implements OnInit, OnDestroy {
  @Input() actionName!: string;
  @Input() action!: any;
  form!: FormGroup;
  submitted = false;

  actions: any[] = [];

  actionSub!: Subscription;

  constructor(
    public lawsuitService: LawsuitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      action: new FormControl(null, Validators.required),
    });

    this.actionSub = this.lawsuitService
      .getActions(this.lawsuitService.fromStepId)
      .subscribe((actions) => {
        this.actions = actions;
        // console.log('this.actions', this.actions);
      });
    // this.route.params
    //   .pipe(
    //     switchMap((params: Params) => {
    //       console.log('select-action', this.route.snapshot.queryParams);

    //       return this.lawsuitService.getActions(
    //         this.route.snapshot.queryParams['stepId']
    //       );
    //     })
    //   )
    //   .subscribe((actions) => {
    //     this.actions = actions;
    //   });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    // console.log('this.form.value', this.form.value);

    this.lawsuitService.actions.push(this.form.value.action);

    // console.log('this.lawsuitService.actionIds', this.lawsuitService.actions);
  }

  ngOnDestroy(): void {
    if (this.actionSub) {
      this.actionSub.unsubscribe();
      this.actions = [];
    }
  }
}
