import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sending-court-step',
  templateUrl: './sending-court-step.component.html',
  styleUrls: ['./sending-court-step.component.scss'],
})
export class SendingCourtStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;

  stepStatus = 0;
  taskId!: any;
  taskInfo: any;
  lastAction: any;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  courtsType: Array<any> = [];
  courtsPlaces: Array<any> = [];
  courtsRegion: Array<any> = [];
  courtsDistrict: Array<any> = [];

  stepForm!: FormGroup;

  sb!: Subscription | undefined;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(this.step),
      task_id: new FormControl(this.taskId),
      type_id: new FormControl(null),
      place_id: new FormControl({ value: null, disabled: true }),
      region_id: new FormControl(null),
      district_id: new FormControl(null),
      defendant_fio: new FormControl(''),
      penalty_sum: new FormControl(''),
      loan_files: new FormControl([], Validators.required),
      claim_files: new FormControl([], Validators.required),
      date_filing_court: new FormControl('', Validators.required),
      add_info: new FormControl(''),
    });

    this.sb = this.clientsService.contractInfo.subscribe(value => {
      value?.tasks?.forEach((el: any) => {
        if (Number(el.task_step) === this.step) {
          this.stepStatus = el.task_status;
          this.taskId = el.task_id;
        }
      });

      if (this.taskId) {
        this.clientsService
          .getTask(this.taskId, this.step)
          .subscribe((value2) => {
            this.taskInfo = value2;
            this.courtsType = value2.sp.courts;
            if (value2.body.history) {
              this.lastAction = value2.body.history.array[value2.body.history.array.length - 1];
            }
          });
      }
    });

    this.sb = this.stepForm.get('type_id')?.valueChanges.subscribe((val) => {
      this.stepForm.get('place_id')?.setValue(null);
      this.stepForm.get('region_id')?.setValue(null);
      this.stepForm.get('district_id')?.setValue(null);
      this.courtsPlaces = [];
      this.courtsRegion = [];
      this.courtsDistrict = [];
      if (val) {
        this.stepForm.get('place_id')?.enable();
      }
      this.courtsPlaces = this.taskInfo?.sp.courts.find(
        (el: any) => val === el.key
      )?.places;
    });
    this.sb = this.stepForm.get('place_id')?.valueChanges.subscribe((val) => {
      this.stepForm.get('region_id')?.setValue(null);
      this.stepForm.get('district_id')?.setValue(null);
      this.courtsRegion = [];
      this.courtsDistrict = [];
      if (val === 2) {
        this.courtsRegion = this.courtsPlaces?.find(
          (el: any) => el.key === val
        ).courts;
      } else if (val === 3) {
        this.courtsRegion = this.courtsPlaces?.find(
          (el: any) => el.key === val
        ).courts;
        this.sb = this.stepForm
          .get('region_id')
          ?.valueChanges.subscribe((val1) => {
            this.stepForm.get('district_id')?.setValue(null);
            this.courtsDistrict = [];
            this.courtsDistrict = this.courtsRegion?.find(
              (el: any) => el.key === val1
            )?.courtsDistrict;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sb?.unsubscribe();
  }

  nextStep(): void {
    if (this.stepStatus === 0) {
      this.stepForm.patchValue({ task_number: String(this.step) });
      this.stepForm.patchValue({ task_id: this.taskId });
      this.complete(this.stepForm.value);
      this.stepForm.reset();
    }
  }

  complete(body: any): void {
    this.clientsService.completeTaskStep(body).subscribe((val: any) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
      this.stepStatus = val.current_task.task_status;
      if (val.body) {
        this.taskInfo = val;
      }
      if (val.body.history) {
        this.lastAction =
          val.body.history.array[val.body.history.array.length - 1];

      }
    });
  }

  getCourtType(type: any): any {
    return this.courtsType.find((el: any) => el.key === type)?.value;
  }

  getCourtPlace(type: any, place: any): any {
    return this.courtsType
      .find((el: any) => el.key === type)
      ?.places.find((el: any) => el.key === place).value;
  }

  getCourtRegion(type: any, place: any, region: any): any {
    return this.courtsType
      .find((el: any) => el.key === type)
      ?.places.find((el: any) => el.key === place)
      ?.courts.find((el: any) => el.key === region).value;
  }

  getCourtDistrict(type: any, place: any, region: any, district: any): any {
    return this.courtsType
      .find((el: any) => el.key === type)
      ?.places.find((el: any) => el.key === place)
      ?.courts.find((el: any) => el.key === region)
      ?.courtsDistrict.find((el: any) => el.key === district).value;
  }
}
