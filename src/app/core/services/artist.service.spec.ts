import { HttpClient } from '@angular/common/http';
import { Artist } from '@core/models';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ArtistService } from './artist.service';

type MockType<T> = { [P in keyof T]?: jest.Mock };

describe('ArtistService', () => {
  let service: ArtistService;
  let httpClientMock: MockType<HttpClient>;
  let scheduler: TestScheduler;
  const successMarble = '(a|)';
  const url = 'http://localhost:3000/artists';

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    httpClientMock = { get: jest.fn() };
    service = new ArtistService(httpClientMock as unknown as HttpClient);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const artists: Artist[] = [
      { id: 12, name: 'Ed Sheeran' },
      { id: 25, name: 'NF' },
    ];

    it('should return array of artist observable', () => {
      scheduler.run(({ expectObservable }) => {
        httpClientMock.get?.mockReturnValue(of([...artists]));
        const expectedResult = { a: [...artists] };

        const result$ = service.findAll();

        expect(result$).toBeDefined();
        expectObservable(result$).toBe(successMarble, expectedResult);
        expect(httpClientMock.get).toHaveBeenCalledTimes(1);
        expect(httpClientMock.get).toHaveBeenCalledWith(url, {
          params: { _page: 1, _limit: 10 },
        });
      });
    });

    it.each([
      [10, 50, undefined, { params: { _page: 10, _limit: 50 } }],
      [
        undefined,
        50,
        { name: 'John' },
        { params: { _page: 1, _limit: 50, name: 'John' } },
      ],
      [
        10,
        undefined,
        { name: 'John' },
        { params: { _page: 10, _limit: 10, name: 'John' } },
      ],
    ])('should return artists', (page, limit, filter, expected) => {
      scheduler.run(({ expectObservable }) => {
        httpClientMock.get?.mockReturnValue(of([...artists]));
        const expectedResult = { a: [...artists] };

        const result$ = service.findAll(page, limit, filter);

        expect(result$).toBeDefined();
        expectObservable(result$).toBe(successMarble, expectedResult);
        expect(httpClientMock.get).toHaveBeenCalledTimes(1);
        expect(httpClientMock.get).toHaveBeenCalledWith(url, expected);
      });
    });
  });
});
