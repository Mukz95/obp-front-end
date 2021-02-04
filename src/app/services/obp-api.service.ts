import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObpApiService {

  constructor(private httpClient: HttpClient) { }

  private BASE_URL = 'https://apisandbox.openbankproject.com/';

  getDirectLoginToken(username: string, password: string, consumerKey: string): Observable<any>{
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `DirectLogin username="${username}",password="${password}",consumer_key="${consumerKey}"`
    });
    return this.httpClient.post(this.BASE_URL.concat('/my/logins/direct'), '',{headers: httpOptions});

  }

  getAccounts(token: string): Observable<any>{
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `DirectLogin token="${token}"`});
    return this.httpClient.get(this.BASE_URL.concat('obp/v4.0.0/my/accounts'), {headers: httpOptions});
  };

  getBank(bankId: string, token: string): Observable<any>{
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `DirectLogin token="${token}"`});
    return this.httpClient.get(this.BASE_URL.concat(`/obp/v4.0.0/banks/${bankId}`), {headers: httpOptions});
  };

  getTransactions(): Observable<any>{
    return this.httpClient.get('https://obp-api.muktar.co.uk'.concat('/transactions'));
  }
}
