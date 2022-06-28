import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout" [class.mobile-layout]="mobileQuery.matches">
      <mat-toolbar color="primary" class="header">
        <button mat-icon-button (click)="snav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button class="h3 header-title" routerLink="/">
          <img class="header-logo" src="assets/team-rockstars-logo.png" /><span
            [hidden]="mobileQuery.matches"
            >{{ title }}</span
          >
        </a>
      </mat-toolbar>
      <mat-sidenav-container
        class="sidenav"
        [style.marginTop.px]="mobileQuery.matches ? 56 : 0"
      >
        <mat-sidenav
          class="sidenav-content"
          #snav
          [mode]="mobileQuery.matches ? 'over' : 'side'"
          [fixedInViewport]="mobileQuery.matches"
          fixedTopGap="56"
          [opened]="!mobileQuery.matches"
        >
          <ng-content select="[sideNavContent]"></ng-content>
        </mat-sidenav>

        <mat-sidenav-content>
          <ng-content></ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  @Input() title = '';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
