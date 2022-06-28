import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

import { Artist } from '@core/models';
import { ArtistDataSource } from '@core/data';
import { ArtistService } from '@core/services';

@Component({
  selector: 'app-artist',
  template: `
    <div class="container mt-2">
      <h1>Artists</h1>
      <form>
        <mat-form-field class="artist-form" appearance="fill">
          <mat-label>Artist name</mat-label>
          <input
            class="artist-form-input-name"
            matInput
            name="artistName"
            placeholder="name"
            (keyup)="onKeyUp($event)"
            [matAutocomplete]="auto"
          />
          <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions$ | async">
              <a [routerLink]="['./', option.name]" class="name-option">{{
                option.name
              }}</a>
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </form>
      <cdk-virtual-scroll-viewport itemSize="50" class="scroll-viewport">
        <mat-nav-list>
          <a
            mat-list-item
            *cdkVirtualFor="let item of ds"
            [routerLink]="[item?.name]"
          >
            <mat-divider></mat-divider>
            <span class="list-item">{{ item?.name || 'Loading...' }}</span>
          </a>
        </mat-nav-list>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  ds = new ArtistDataSource(this.artistService);
  searchTerm = '';
  search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _filteredOptions = new BehaviorSubject<Artist[]>([]);
  filteredOptions$: Observable<Artist[]> = this._filteredOptions.asObservable();

  constructor(private readonly artistService: ArtistService) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((name) => this.artistService.findAll(1, 10, { name })),
        takeUntil(this.unsubscribe)
      )
      .subscribe((artists) => {
        this._filteredOptions.next(artists);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onKeyUp(event: any): void {
    const term: string = event.target?.value || '';
    this.search$.next(term.trim());
  }
}
