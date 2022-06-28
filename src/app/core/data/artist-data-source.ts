import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import { Artist, ArtistFilter } from '@core/models';
import { ArtistService } from '@core/services';

export class ArtistDataSource extends DataSource<Artist> {
  private length = 200;
  private pageSize = 20;
  private cachedData = Array.from<Artist>({ length: this.length });
  private fetchedPages = new Set<number>();
  private readonly subscription = new Subscription();

  private readonly artists = new BehaviorSubject<Artist[]>(this.cachedData);
  artist$ = this.artists.asObservable();

  private artistFilter!: ArtistFilter;

  constructor(private artistService: ArtistService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Artist[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end);

        for (let i = startPage; i <= endPage; i++) {
          this.fetch(i, this.artistFilter);
        }
      })
    );
    return this.artists;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
    this.artists.complete();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetch(page: number, filter?: ArtistFilter): void {
    if (this.fetchedPages.has(page)) return;

    this.fetchedPages.add(page);

    this.artistService
      .findAll(page + 1, this.pageSize, filter)
      .subscribe((res) => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...res);
        this.artists.next(this.cachedData);
      });
  }
}
