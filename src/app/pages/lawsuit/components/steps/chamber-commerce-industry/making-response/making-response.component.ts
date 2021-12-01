import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { datepickerSettings } from 'src/app/pages/application/shared/settings';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-making-response',
  templateUrl: './making-response.component.html',
  styleUrls: ['./making-response.component.scss'],
})
export class MakingResponseComponent implements OnInit {
  @Input() actionId!: number;
  form!: FormGroup;
  submitted = false;

  myDpOptions: IAngularMyDpOptions = datepickerSettings;

  constructor(
    private alert: AlertService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {
    let d: Date = new Date();
    d.setDate(d.getDate() + 2);
    let model: IMyDateModel = {
      isRange: false,
      // singleDate: { jsDate: d },
      // dateRange: null,
    };

    this.form = new FormGroup({
      numberDoc: new FormControl(null, Validators.required),
      dateDoc: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const data = {
      active: true,
      inDocNumber: this.form.value.numberDoc,
      inDocDate: this.form.value.dateDoc.singleDate.formatted,
      addInfo: this.form.value.additionalInfo,
    };

    this.lawsuitService.apiFetch(data, 'tpp/add/response').subscribe(
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
}
