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

  filials!: any;
  mfoSub!: Subscription;
  mapSub!: Subscription;

  constructor(public clientsService: ClientsService) {}

  ngOnInit(): void {
    this.mfoSub = this.clientsService.getMfo().subscribe((filials) => {
      this.filials = filials.data;
    });

    this.mfoSub = fromEvent(this.mapRef.nativeElement, 'click')
      .pipe(
        map((event: any) => event.target),
        filter((event) => event.id)
      )
      .subscribe((area) => {
        // console.log(area.getBoundingClientRect());
      });
  }

  ngOnDestroy(): void {
    if (this.mfoSub) {
      this.mfoSub.unsubscribe();
    }
  }
}
