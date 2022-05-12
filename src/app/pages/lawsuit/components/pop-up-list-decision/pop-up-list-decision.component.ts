import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  formm!: FormGroup;
  submitted = false;

  // decisions!: any;

  // options = [
  //   { label: 'Отказать', value: 1 },
  //   { label: 'Одобрить', value: 3 },
  // ];

  constructor(
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService,
    public fileUploadService: FileUploadService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.popUpInfoSub = this.popUpInfoService.popUpListDecision$.subscribe(
      (popUpData: any) => {
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
            clearInterval(this.lawsuitService.timerIdDecisions);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.popUpInfoSub?.unsubscribe();

    this.closePopUpInfoSub?.unsubscribe();
  }
}
