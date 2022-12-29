import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DictionariesService } from 'src/app/services/dictionfries.service';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-history-file',
  templateUrl: './history-file.component.html',
  styleUrls: ['./history-file.component.scss'],
})
export class HistoryFileComponent implements OnInit {
  @ViewChild('historyFile') historyFileRef!: ElementRef;
  dictionaries!: any;

  constructor(
    public lawsuitService: LawsuitService,
    private dicService: DictionariesService
  ) {}

  ngOnInit(): void {}

  getValue(dicName: string, val: any): any {
    if (this.dictionaries) {
      return this.dictionaries[dicName]?.find((i: any) => i.id === val)?.lang[
        this.lawsuitService.translate.currentLang
      ];
    }
  }
}
