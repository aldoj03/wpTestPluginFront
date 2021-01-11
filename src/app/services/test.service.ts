import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  public testSaved: boolean = false

  public ulrBase: String = '';

  constructor(
    private httpClient: HttpClient,
  ) {
    if(environment.apiURl2){
      this.ulrBase = environment.apiURl2
    }else{
      alert('Error api url')
    }
  }

  getTest(id: string,id_user:any) {

   
    
    const endPoint = `${this.ulrBase}testdata?id=${id}&id_user=${id_user}`;
    console.log(endPoint);
    return this.httpClient.get<any>(endPoint)

  }
  saveTest(id: string, data: any) {

    const endPoint = this.ulrBase + 'results';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post<any>(endPoint, data)

  }

  newAttempt(idUser:any,idTest:any){

    const body = {idUser,idTest}
    const endPoint = this.ulrBase + 'newAttempt'
    return this.httpClient.post(endPoint,body);
  }
  
  public set setSavedTest(v : boolean) {
    this.testSaved = v;
  }

  
  public get getSavedTest() : boolean {
    return this.testSaved;
  }
  

}
