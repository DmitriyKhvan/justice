import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  @ViewChild('tooltipMap', { static: true }) tooltipMapRef!: ElementRef;

  filials!: any;
  mfoSub!: Subscription;
  mapSub!: Subscription;
  filial!: any;
  currentDate: number = Date.now();

  constructor(public clientsService: ClientsService) {}

  ngOnInit(): void {
    this.mfoSub = this.clientsService.getMfo().subscribe((filials) => {
      this.filials = filials.data;
    });

    this.mfoSub = fromEvent(this.mapRef.nativeElement, 'click')
      .pipe(
        map((event: any) => event.target),
        tap((event) => {
          // console.log(this.mapRef.nativeElement.getElementsByTagName('path')),
          this.tooltipMapRef.nativeElement.setAttribute(
            'style',
            `display: none`
          );
          this.mapRef.nativeElement
            .querySelectorAll('path')
            .forEach((i: any) => {
              i.classList.remove('active');
            });
        }),
        filter((event) => event.hasAttribute('code'))
      )
      .subscribe((area) => {
        const code = area.getAttribute('code');

        this.filial = this.filials.find((i: any) => i.code === code);

        area.classList.add('active');
        const coords = area.getBoundingClientRect();
        this.tooltipMapRef.nativeElement.setAttribute(
          'style',
          `left: ${coords.x - 80}px; top: ${coords.y - 110}px; display: block`
        );
      });
  }

  ngOnDestroy(): void {
    if (this.mfoSub) {
      this.mfoSub.unsubscribe();
    }
  }
}
