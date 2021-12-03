import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-referral-case-to-cassation',
  templateUrl: './referral-case-to-cassation.component.html',
  styleUrls: ['./referral-case-to-cassation.component.scss'],
})
export class ReferralCaseToCassationComponent implements OnInit {
  @Input() actionId!: number;
  form!: FormGroup;
  submitted = false;

  viewLawDic = [
    { value: 1, label: 'Вид1' },
    { value: 2, label: 'Вид2' },
  ];

  typeLawDic = [
    { value: 1, label: 'Тип1' },
    { value: 2, label: 'Тип2' },
  ];

  regionLawDic = [
    { value: 1, label: 'Регион суда1' },
    { value: 2, label: 'Регион суда2' },
  ];

  regionDic = [
    { value: 1, label: 'Регион1' },
    { value: 2, label: 'Регион2' },
  ];

  districtLawDic = [
    { value: 1, label: 'Районный суд1' },
    { value: 2, label: 'Районный суд2' },
  ];

  constructor(
    public lawsuitService: LawsuitService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      viewLaw: new FormControl(null, Validators.required),
      typeLaw: new FormControl(null, Validators.required),
      regionLaw: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      districtLaw: new FormControl(null, Validators.required),
      numberDoc: new FormControl('', Validators.required),
      dateDoc: new FormControl('', Validators.required),
      additionalInfo: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const lawId = this.lawsuitService.getReqId(5).id;

    const data = {
      lawKind: this.form.value.viewLaw,
      lawType: this.form.value.typeLaw,
      lawRegion: this.form.value.regionLaw,
      region: this.form.value.region,
      lawDistrict: this.form.value.districtLaw,
      outDocNumber: this.form.value.numberDoc,
      outDocDate: this.form.value.dateDoc,
      files: [
        {
          id: 0,
          name: 'string',
        },
      ],
      addInfo: this.form.value.additionalInfo,
      lawId,
      active: true,
    };

    this.lawsuitService.apiFetch(data, 'law/add/cassationRequest').subscribe(
      (actions) => {
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