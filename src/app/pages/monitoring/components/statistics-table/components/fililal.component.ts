import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filial',
  template: `
    <tr class="filial">
      <td class="accord-row">
        <span>
          <i (click)="toggleFilials2()" class="uil-code accord"></i>
        </span>
      </td>
      <td class="number">
        <span>{{ idx + 1 }}.{{ idx2 + 1 }}.</span>
      </td>
      <td>
        <span>{{ filial.branchNameRus }}</span>
      </td>
      <td>
        <span>{{ filial.count }}</span>
      </td>
      <td>
        <span>{{ filial.amount }}</span>
      </td>

      <td>
        <span>{{ filial.tppCount }}</span>
      </td>
      <td>
        <span>{{ filial.tppAmount }}</span>
      </td>

      <td>
        <span>{{ filial.lawCount }}</span>
      </td>
      <td>
        <span>{{ filial.lawAmount }}</span>
      </td>

      <td>
        <span>{{ filial.mibCount }}</span>
      </td>
      <td>
        <span>{{ filial.mibAmount }}</span>
      </td>

      <td>
        <span>{{ filial.notarCount }}</span>
      </td>
      <td>
        <span>{{ filial.notarAmount }}</span>
      </td>

      <td>
        <span>{{ filial.lawEnfCount }}</span>
      </td>
      <td>
        <span>{{ filial.lawEnfAmount }}</span>
      </td>

      <td>
        <span>{{ filial.stopPercentCount }}</span>
      </td>
      <td>
        <span>{{ filial.stopPercentAmount }}</span>
      </td>

      <td>
        <span>{{ filial.tppStopCount }}</span>
      </td>
      <td>
        <span>{{ filial.tppStopAmount }}</span>
      </td>

      <td>
        <span>{{ filial.lawStopCount }}</span>
      </td>
      <td>
        <span>{{ filial.lawStopAmount }}</span>
      </td>

      <td>
        <span>{{ filial.mibStopCount }}</span>
      </td>
      <td>
        <span>{{ filial.mibStopAmount }}</span>
      </td>

      <td>
        <span>{{ filial.notarStopCount }}</span>
      </td>
      <td>
        <span>{{ filial.notarStopAmount }}</span>
      </td>

      <td>
        <span>{{ filial.lawEnfStopCount }}</span>
      </td>
      <td>
        <span>{{ filial.lawEnfStopAmount }}</span>
      </td>

      <!-- <td>
            <span>{{ filial.count }}</span>
          </td>
          <td>
            <span>{{ filial.amount }}</span>
          </td> -->
    </tr>

    <ng-container *ngFor="let client of filial.clients; let idx3 = index">
      <ng-container *ngIf="isClient">
        <tr>
          <td></td>
          <td class="number">
            <span>{{ idx + 1 }}.{{ idx2 + 1 }}.{{ idx3 + 1 }}</span>
          </td>
          <td>
            <span>{{ client.clientFio }}</span>
          </td>
          <td>
            <span>{{ client.count }}</span>
          </td>
          <td>
            <span>{{ client.amount }}</span>
          </td>

          <td>
            <span>{{ client.tppCount }}</span>
          </td>
          <td>
            <span>{{ client.tppAmount }}</span>
          </td>

          <td>
            <span>{{ client.lawCount }}</span>
          </td>
          <td>
            <span>{{ client.lawAmount }}</span>
          </td>

          <td>
            <span>{{ client.mibCount }}</span>
          </td>
          <td>
            <span>{{ client.mibAmount }}</span>
          </td>

          <td>
            <span>{{ client.notarCount }}</span>
          </td>
          <td>
            <span>{{ client.notarAmount }}</span>
          </td>

          <td>
            <span>{{ client.lawEnfCount }}</span>
          </td>
          <td>
            <span>{{ client.lawEnfAmount }}</span>
          </td>

          <td>
            <span>{{ client.stopPercentCount }}</span>
          </td>
          <td>
            <span>{{ client.stopPercentAmount }}</span>
          </td>

          <td>
            <span>{{ client.tppStopCount }}</span>
          </td>
          <td>
            <span>{{ client.tppStopAmount }}</span>
          </td>

          <td>
            <span>{{ client.lawStopCount }}</span>
          </td>
          <td>
            <span>{{ client.lawStopAmount }}</span>
          </td>

          <td>
            <span>{{ client.mibStopCount }}</span>
          </td>
          <td>
            <span>{{ client.mibStopAmount }}</span>
          </td>

          <td>
            <span>{{ client.notarStopCount }}</span>
          </td>
          <td>
            <span>{{ client.notarStopAmount }}</span>
          </td>

          <td>
            <span>{{ client.lawEnfStopCount }}</span>
          </td>
          <td>
            <span>{{ client.lawEnfStopAmount }}</span>
          </td>

          <!-- <td>
                <span>{{ filial.count }}</span>
              </td>
              <td>
                <span>{{ filial.amount }}</span>
              </td> -->
        </tr>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class FilialComponent implements OnInit {
  @Input() filial: any;
  @Input() idx = 0;
  @Input() idx2 = 0;
  isClient = false;

  ngOnInit(): void {}

  toggleFilials2() {
    this.isClient = !this.isClient;
  }
}
