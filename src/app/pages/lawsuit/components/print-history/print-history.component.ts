import { Component, OnInit, Input } from '@angular/core';
import { HistoryFileComponent } from '../history-file/history-file.component';

@Component({
  selector: 'app-print-history',
  templateUrl: './print-history.component.html',
  styleUrls: [
    './print-history.component.scss',
    '../make-decesions/make-decesions.component.scss',
  ],
})
export class PrintHistoryComponent implements OnInit {
  @Input() historyFileRef!: any;

  constructor() {}

  ngOnInit(): void {}

  printHistory() {
    console.log(this.historyFileRef.historyFileRef.nativeElement);
    console.log(document.documentElement.clientWidth);

    const prtContent = this.historyFileRef.historyFileRef.nativeElement;

    const WinPrint = window.open(
      '',
      '',
      `left=${document.documentElement.clientWidth / 2 - 500},
      top=${document.documentElement.clientHeight / 2 - 370},
      width=1000,
      height=740,
      toolbar=0,
      scrollbars=1,
      status=0`
    );

    if (WinPrint) {
      const head = document.querySelector('head');
      console.log(head);
      // WinPrint.document.write('<html><head><title>Логин и пароль</title>');
      WinPrint.document.write(
        `<html>
          ${head?.innerHTML}
          <body>
            ${prtContent.innerHTML}
          </body>
        </html>`
      );

      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(function () {
        WinPrint.print();
        WinPrint.close();
      }, 500);
    }
  }
}
