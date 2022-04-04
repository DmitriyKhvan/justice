import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-form-decision',
  templateUrl: './form-decision.component.html',
  styleUrls: ['./form-decision.component.scss'],
})
export class FormDecisionComponent implements OnInit {
  @Input() processId!: any;

  form!: FormGroup;
  submitted = false;

  options = [
    { label: 'Отказать', value: 1 },
    { label: 'Одобрить', value: 3 },
  ];

  headLawyerFiles: any[] = [];

  constructor(
    public lawsuitService: LawsuitService,
    private popUpInfoService: PopUpInfoService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      decision: new FormControl(null, Validators.required),
      additionalInfo: new FormControl(''),
      file: new FormControl(''),
      fileSource: new FormControl(''),
    });
  }

  setFiles(file: any) {
    this.headLawyerFiles.push(file);
  }

  deleteFile(id: number) {
    this.headLawyerFiles = this.headLawyerFiles.filter(
      (file) => file.id !== id
    );
  }

  submitDecisionAction(event: any) {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const data = {
      processId: this.processId,
      status: this.form.value.decision,
      headLawyerInfo: this.form.value.additionalInfo,
      headLawyerFiles: this.headLawyerFiles,
    };

    this.lawsuitService.confirmAction(data, 'process/confirmAction').subscribe(
      (decisions) => {
        // this.lawsuitService.historyActions = actions;
        const el = event.target.closest('.decision_form')
          .previousElementSibling;
        el.classList.toggle('active');
        el.classList.add('complete');

        this.form.reset();

        this.popUpInfoService.updateContractList$.next(true);

        setTimeout(() => {
          this.lawsuitService.decisions = decisions;
        }, 3000);
        // this.alert.success('Форма оформлена');
      },
      (error) => {
        // this.alert.danger('Форма не оформлена');
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
