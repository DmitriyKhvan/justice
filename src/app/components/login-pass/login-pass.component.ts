import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoginPass } from 'src/app/interfaces';

@Component({
  selector: 'app-login-pass',
  templateUrl: './login-pass.component.html',
  styleUrls: ['./login-pass.component.scss'],
})
export class LoginPassComponent implements OnInit {
  @Input() loginPass!: LoginPass;
  @ViewChild('lp') lp!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  copyLoginPass() {
    const copyText = this.lp.nativeElement.innerText;

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  downloadPDF() {
    const prtContent = this.lp.nativeElement;

    const WinPrint = window.open(
      '',
      '',
      `left=${document.documentElement.clientWidth / 2 - 400},
      top=${document.documentElement.clientHeight / 2 - 320},
      width=800,
      height=640,
      toolbar=0,
      scrollbars=1,
      status=0`
    );

    if (WinPrint) {
      // WinPrint.document.write('<html><head><title>Логин и пароль</title>');
      WinPrint.document.write('<html><body>');
      WinPrint.document.write('');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.write('</body></html>');
      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(function () {
        WinPrint.print();
        WinPrint.close();
      }, 500);
    }
  }
}
