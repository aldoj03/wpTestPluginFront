import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  public ulrBase: String = '';

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.ulrBase = environment.apiURl2
  }

  getTest(id: string) {

    const body = {
      id
    };

    const endPoint =  this.ulrBase + 'testdata/' + id;
    return this.httpClient.get<any>(endPoint)

  }
  saveTest(id: string) {

    const body = {
      "id_user": 1,
      "id_test": 12,
      "date": "4123-02-03",
      "attemps": 1,
      "completed": 2,
      "max_performance": 1,
      "session_data": "asd"
    };

    const endPoint =  this.ulrBase + 'results';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.httpClient.post<any>('http://localhost/wordpress/wp-json/wpcode/v1/results', body)

  }
}
