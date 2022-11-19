import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionariesService } from 'src/app/services/dictionfries.service';

@Component({
  selector: 'app-appeal-law-response-template',
  template: `
    <div class="data-lawyer">
      <div class="row justify-content-between">
        <div class="col-6">{{ 'caseNumber' | translate }}</div>
        <div class="col-6">{{ actionData.data.docNumber }}</div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6">{{ 'decisionDate' | translate }}</div>
        <div class="col-6">{{ actionData.data.decisionDate }}</div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'decisionResult' | translate }}</div>
        <div class="col-6">
          {{ getValue('courtDecision', actionData.data.decisionResult) }}
        </div>
      </div>

      <ng-container
        *ngIf="
          actionData.data.decisionResult === 35 ||
          actionData.data.decisionResult === 36
        "
      >
        <div class="row justify-content-between">
          <div class="col-6">{{ 'appealAgainstLawDesicion' | translate }}</div>
          <div class="col-6">
            {{ getValueYesOrNot('yesNo', actionData.data.appeal) }}
          </div>
        </div>

        <ng-container *ngIf="actionData.data.appeal === true">
          <div class="row justify-content-between">
            <div class="col-6">{{ 'typeAppeal' | translate }}</div>
            <div class="col-6">
              {{ getValue('appealType', actionData.data.appealKind) }}
            </div>
          </div>
        </ng-container>

        <ng-container *ngIf="actionData.data.appeal === false">
          <div class="row justify-content-between">
            <div class="col-6">{{ 'action2' | translate | titlecase }}</div>
            <div class="col-6">
              {{ getValue('notAppealAction', actionData.data.action) }}
            </div>
          </div>

          <ng-container *ngIf="actionData.data.action === 49">
            <div class="row justify-content-between">
              <div class="col-6">{{ 'deferTo' | translate }}</div>
              <div class="col-6">{{ actionData.data.suspendDate }}</div>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-container
        *ngIf="actionData.data.decisionResult === 34"
        class="row justify-content-between"
      >
        <div class="row justify-content-between">
          <div class="col-6">{{ 'forceDecisionDate' | translate }}</div>
          <div class="col-6">{{ actionData.data.decisionBeginDate }}</div>
        </div>
      </ng-container>

      <ng-container
        *ngIf="
          actionData.data.appeal === true ||
          actionData.data.decisionResult === 34
        "
      >
        <div class="row justify-content-between">
          <div class="col-6">{{ 'principal_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealPrincipalAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">{{ 'percent_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealInterestAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">{{ 'penalty_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealPenaltyAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">{{ 'fine_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealFineAmount }}</div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">
            {{ 'appealStateDutyCourtCostsAmount' | translate }}
          </div>
          <div class="col-6">
            {{ actionData.data.appealStateDutyCourtCostsAmount }}
          </div>
        </div>

        <div class="row justify-content-between">
          <div class="col-6">{{ 'total_claim_amount' | translate }}</div>
          <div class="col-6">{{ actionData.data.appealClaimAmount }}</div>
        </div>

        <!-- <div class="row justify-content-between">
            <div class="col-6">{{'attached_files' | translate}}</div>
            <div class="col-6">
              <app-file-downloader
                [formData]="actionData"
              ></app-file-downloader>
            </div>
          </div>

          <div class="row justify-content-between">
            <div class="col-6">{{'additional_information' | translate}}</div>
            <div class="col-6">{{ actionData.data.appealAddInfo }}</div>
          </div> -->
      </ng-container>

      <!-- <ng-container *ngIf="actionData.data.action == 3"> -->
      <div class="row justify-content-between">
        <div class="col-6">{{ 'attached_files' | translate }}</div>
        <div class="col-6">
          <app-file-downloader
            [formData]="actionData?.data?.files"
          ></app-file-downloader>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-6">{{ 'additional_information' | translate }}</div>
        <div class="col-6">{{ actionData.data.addInfo }}</div>
      </div>
      <!-- </ng-container> -->
    </div>
  `,
  styles: [],
})
export class AppealLawResponseTemplateComponent implements OnInit {
  @Input() actionData!: any;

  dicSub!: Subscription;
  dictionaries!: any;

  constructor(private dicService: DictionariesService) {}

  ngOnInit(): void {
    this.dicSub = this.dicService
      .getDicByActionId(this.actionData.actionId)
      .subscribe((dictionaries: any) => {
        this.dictionaries = dictionaries;
      });
  }

  getValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang[
        this.dicService.translate.currentLang
      ];
    }
  }

  getValueYesOrNot(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.value === val)
        ?.lang[this.dicService.translate.currentLang];
    }
  }
}
