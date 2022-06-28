import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container mt-2 content">
      <div class="title-section">
        <h1>404 - Page not found</h1>
      </div>
      <div class="cta-home">
        <a mat-raised-button color="primary" [routerLink]="['/']">Home Page</a>
      </div>
    </div>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
