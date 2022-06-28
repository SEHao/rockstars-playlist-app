import { RouterTestingModule } from '@angular/router/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  MockReset,
} from 'ng-mocks';

import { ArtistComponent } from './artist.component';
import { ArtistModule } from './artist.module';

describe('ArtistComponent', () => {
  let fixture: MockedComponentFixture<ArtistComponent, unknown>;
  let component: ArtistComponent;

  beforeAll(() => MockBuilder(ArtistComponent, ArtistModule));
  beforeAll(() => {
    fixture = MockRender(ArtistComponent, {});
    component = fixture.point.componentInstance;
  });

  afterAll(MockReset);

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
