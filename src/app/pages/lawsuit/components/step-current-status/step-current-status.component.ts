import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-step-current-status',
  templateUrl: './step-current-status.component.html',
  styleUrls: ['./step-current-status.component.scss'],
})
export class StepCurrentStatusComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    public lawsuitService: LawsuitService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      currentStatus: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const text = this.form.value.currentStatus;

    this.lawsuitService.setStepStatus(text).subscribe(
      (actions) => {
        this.alert.success('Форма оформлена');
        this.form.reset();
      },
      (error) => {},
      () => {
        this.submitted = false;
      }
    );
  }
}
