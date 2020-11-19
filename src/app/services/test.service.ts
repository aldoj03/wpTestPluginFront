import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTest(id: string) {

    const body = {
      id
    };

    const endPoint = environment.apiURl + 'test/' + id;
    return this.httpClient.get<any>(endPoint)

  }
}
