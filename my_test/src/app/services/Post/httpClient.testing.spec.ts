import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

let testUrl = '/data';
interface Data {
  name: string;
}
describe('http client testing moduel', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call the testurl with get Requies', () => {
    const testData: Data = { name: 'Kovács' };
    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
    expect(request.request.method).toBe('GET');
  });

  it('sgould test multiple requests', () => {
    const testData: Data[] = [{ name: 'Kovács' }, { name: 'Farkas' }];

    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data.length).toEqual(0);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual([testData[0]]);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const requiest = httpTestingController.match(testUrl);
    expect(requiest.length).toEqual(3);

    requiest[0].flush([]);
    requiest[1].flush([testData[0]]);
    requiest[2].flush(testData);
  });
});
